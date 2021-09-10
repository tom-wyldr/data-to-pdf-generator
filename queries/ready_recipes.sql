WITH base AS
         (
             SELECT r.id                                                            AS recipe_id,
                    u.id                                                            AS user_id,
                    dd.da_first_name                                                AS firstName,
                    dd.da_last_name                                                 AS lastName,
                    r."name" ->> u.locale :: TEXT                                   AS recipe_title,
                    u.locale,
                    CASE
                        WHEN u.locale = 'de' THEN r.health_tip ->> 'de'
                        ELSE r.health_tip ->> 'en'
                        END
                                                                                    AS health_tip,
                    CASE
                        WHEN rc.category = 'meat' AND u.locale = 'de' THEN 'Fleisch'
                        WHEN rc.category = 'fish' AND u.locale = 'de' THEN 'Fisch'
                        WHEN rc.category = 'vegetarian' AND u.locale = 'de' THEN 'Vegetarisch'
                        WHEN rc.category = 'vegan' AND u.locale = 'de' THEN 'Vegan'
                        ELSE rc.category
                        END                                                         AS recipe_category,
                    CASE
                        WHEN rc.category = 'meat' THEN 'https://staging.wyldr.de/resources/ui/tags/steak.png'
                        WHEN rc.category = 'fish' THEN 'https://staging.wyldr.de/resources/ui/tags/fish.png'
                        WHEN rc.category = 'vegetarian'
                            THEN 'https://staging.wyldr.de/resources/ui/tags/vegetarian.png'
                        WHEN rc.category = 'vegan' THEN 'https://staging.wyldr.de/resources/ui/tags/vegan.png'
                        END                                                         AS recipe_category_image_url,
                    CONCAT(r.net_prep_time, '''')                                   AS net_prep_time,
                    CONCAT(r.gross_prep_time, '''')                                 AS gross_prep_time,
                    CASE
                        WHEN u.locale = 'en' THEN CONCAT(hrplw.portions_per_recipe, ' portions')
                        ELSE CONCAT(hrplw.portions_per_recipe, ' Portionen')
                        END                                                         AS portions,
                    CONCAT('https://app.wyldr.de/recipes-detailed/', r.id)             recipe_url,
                    CONCAT('https://app.wyldr.de/resources', image_path)               recipe_image_url,
                    CASE
                        WHEN u.locale = 'en'
                            THEN '*Ingredients we assumed you have at home and therefore not delivered by default'
                        ELSE '*Basics, die wir nicht automatisch mitliefern und die ihr zu eurer Lieferung hinzufügen könnt'
                        END                                                         AS recipe_foot_note,
                    CASE
                        WHEN u.locale = 'en' THEN 'Ingredients'
                        ELSE 'Bio Zutaten'
                        END                                                         AS recipe_ingredient_title,
                    CASE
                        WHEN u.locale = 'en' THEN 'Steps'
                        ELSE 'Schritte'
                        END                                                         AS recipe_instruction_title,
                    CONCAT(EXTRACT(YEAR FROM now()), '-W', EXTRACT(WEEK FROM CURRENT_DATE + INTERVAL '7 day'), '_',
                           lwbi.box_id, '_', lwbi.delivery_pickup_block, '_', u.id) AS print_id
             FROM recipes r
                      INNER JOIN household_recipe_portions_last_week hrplw ON hrplw.recipe_id = r.id
                      LEFT JOIN recipe_categories rc ON rc.recipe_id = r.id
                      LEFT JOIN users u ON u.id = hrplw.household_owner_user_id
                      LEFT JOIN delivery_details dd ON dd.id = u.delivery_details_id
                      LEFT JOIN last_week_box_ids lwbi ON lwbi.user_id = u.id
             WHERE r.deleted_at IS NULL
               AND r.live
             ORDER BY lwbi.box_id DESC,
                      r.id
         ),
     paos AS (
         SELECT hrplw.recipe_id,
                hrplw.household_owner_user_id AS user_id,
                CASE
                    WHEN ri.unit_id IN (3, 19, 22, 23, 41, 13, 16, 43)
                        THEN CONCAT(
                            ROUND(CAST(SUM(ri.value * hrplw.portions_per_recipe / r.servings) AS NUMERIC), 0), ' ',
                            u2.display_text ->> u1.locale::TEXT, ' ', s.display_text ->> u1.locale::TEXT)
                    WHEN ri.unit_id IN (4, 10)
                        THEN CONCAT(
                            ROUND(CAST(SUM(ri.value * hrplw.portions_per_recipe / r.servings) AS NUMERIC), 0),
                            u2.display_text ->> u1.locale::TEXT, ' ', s.display_text ->> u1.locale::TEXT)
                    ELSE
                        CONCAT(ROUND(CAST(SUM(ri.value * hrplw.portions_per_recipe / r.servings) AS NUMERIC), 2),
                               ' ', u2.display_text ->> u1.locale::TEXT, ' ', s.display_text ->> u1.locale::TEXT)
                    END                       AS ingredient_list
         FROM public.household_recipe_portions_last_week hrplw
                  INNER JOIN recipe_ingredients ri
                             ON hrplw.recipe_id = ri.recipe_id
                  INNER JOIN recipes r
                             ON hrplw.recipe_id = r.id
                  INNER JOIN users u1
                             ON hrplw.household_owner_user_id = u1.id
                  LEFT JOIN skus s
                            ON ri.sku_id = s.id
                  INNER JOIN units u2
                             ON ri.unit_id = u2.id
                  LEFT JOIN last_week_box_ids lwbi
                            ON u1.id = lwbi.user_id
         WHERE r.deleted_at IS NULL
           AND ri.deleted_at IS NULL
           AND s.deleted_at IS NULL
           AND u1.deleted_at IS NULL
           AND u2.deleted_at IS NULL
           AND r.live IS TRUE
           AND s.is_assumed_at_home IS TRUE
         GROUP BY hrplw.recipe_id, hrplw.household_owner_user_id, hrplw.email, s.display_text, u1.locale,
                  ri.unit_id, u2.display_text, lwbi.box_id
     ),
     instructions AS (
         SELECT 
	    ri.recipe_id AS recipe_id,
             u1.id AS user_id,
             CONCAT(ri.step, ' - ', ri."text" ->> u1.locale) AS recipe_instructions,
             ri.step,
             ARRAY_AGG ( 
                 CASE
	            WHEN ri2.unit_id IN (2,4,10)
	                THEN CONCAT(CEILING(ri2.value * hrplw.portions_per_recipe / r.servings), u2.display_text->> u1.locale::TEXT, ' ', s.display_text ->> u1.locale::TEXT)
		   WHEN ri2.unit_id IN (3,13,16,19,22,23,41,42,43)
		       THEN CONCAT(CEILING(ri2.value * hrplw.portions_per_recipe / r.servings), ' ', u2.display_text->> u1.locale::TEXT, ' ', s.display_text ->> u1.locale::TEXT)
		    ELSE
		        CONCAT(ri2.value * hrplw.portions_per_recipe / r.servings, ' ', u2.display_text->> u1.locale::TEXT, ' ', s.display_text ->> u1.locale::TEXT)
	        END
	    ) AS ingredient_list 
         FROM recipe_instructions ri
         INNER JOIN household_recipe_portions_last_week hrplw ON hrplw.recipe_id = ri.recipe_id
         INNER JOIN recipes r ON ri.recipe_id = r.id
         LEFT JOIN users u1 ON u1.id = hrplw.household_owner_user_id
         LEFT JOIN recipe_ingredients ri2 ON ri.recipe_id = ri2.recipe_id AND ri.step = ri2.recipe_instruction_id 
         LEFT JOIN skus s ON ri2.sku_id = s.id
         LEFT JOIN units u2 ON ri2.unit_id = u2.id
         WHERE 
                  ri.deleted_at IS NULL
                  AND r.deleted_at IS NULL 
                  AND ri2.deleted_at IS NULL
                  AND s.deleted_at IS NULL
         GROUP BY ri.recipe_id, u1.id, recipe_instructions, ri.step 
         ORDER BY ri.recipe_id, ri.step
     ),
     ingredients AS
         (
             SELECT hrplw.recipe_id,
                    hrplw.household_owner_user_id AS user_id,
                    hrplw.email,
                    CASE
                        WHEN ri.unit_id IN (2, 4, 10)
                            THEN CONCAT(CEILING(SUM(ri.value * hrplw.portions_per_recipe / r.servings)),
                                        u2.display_text ->> u1.locale::TEXT, ' ',
                                        s.display_text ->> u1.locale::TEXT)
                        WHEN ri.unit_id IN (3, 13, 16, 19, 22, 23, 41, 42, 43)
                            THEN CONCAT(CEILING(SUM(ri.value * hrplw.portions_per_recipe / r.servings)), ' ',
                                        u2.display_text ->> u1.locale::TEXT, ' ',
                                        s.display_text ->> u1.locale::TEXT)
                        ELSE
                            CONCAT(SUM(ri.value * hrplw.portions_per_recipe / r.servings), ' ',
                                   u2.display_text ->> u1.locale::TEXT, ' ', s.display_text ->> u1.locale::TEXT)
                        END                       AS ingredient_list
             FROM public.household_recipe_portions_last_week hrplw
                      INNER JOIN recipe_ingredients ri
                                 ON hrplw.recipe_id = ri.recipe_id
                      INNER JOIN recipes r
                                 ON hrplw.recipe_id = r.id
                      INNER JOIN users u1
                                 ON hrplw.household_owner_user_id = u1.id
                      LEFT JOIN skus s
                                ON ri.sku_id = s.id
                      INNER JOIN units u2
                                 ON ri.unit_id = u2.id
                      LEFT JOIN last_week_box_ids lwbi
                                ON u1.id = lwbi.user_id
             WHERE r.deleted_at IS NULL
               AND ri.deleted_at IS NULL
               AND s.deleted_at IS NULL
               AND u1.deleted_at IS NULL
               AND u2.deleted_at IS NULL
               AND r.live IS TRUE
               AND s.is_assumed_at_home IS FALSE
             GROUP BY hrplw.recipe_id, hrplw.household_owner_user_id, hrplw.email, s.display_text, u1.locale,
                      ri.unit_id,
                      u2.display_text, lwbi.box_id
             ORDER BY ingredient_list
         ),
     nutrients AS
         (
             SELECT
                 risq.recipe_id,
                 n.full_name_en,
                 n.full_name_de,
                 n.id,
                 n.nutrient_category_en,
                 n.nutrient_category_de,
                 CASE
                     WHEN REPLACE(n.unit, '/100 g','') = 'mg' THEN SUM(nd.value * risq.ing_quant_grams / 100 / risq.portions) / 1000
                     WHEN REPLACE(n.unit, '/100 g','') = 'µg' THEN SUM(nd.value * risq.ing_quant_grams / 100 / risq.portions) / 1000000
                     ELSE SUM(nd.value * risq.ing_quant_grams / 100 / risq.portions)
                     END AS nutrient_gram_per_portion
             FROM public.recipe_ingredients_standard_quantities risq
                      INNER JOIN (SELECT DISTINCT recipe_id FROM household_recipe_portions_last_week) hrplw ON hrplw.recipe_id = risq.recipe_id
                      INNER JOIN public.nutrition_data nd ON nd.ingredient_id = risq.ing_id
                      LEFT JOIN nutrients n ON n.id = nd.nutrient_id
                      INNER JOIN recipes r2 ON r2.id = risq.recipe_id AND r2.deleted_at IS NULL AND r2.live
             WHERE n.id IN(133, 134, 135, 136, 69, 70, 93, 66, 67, 68, 75)
             GROUP BY
                 risq.recipe_id,
                 risq.recipe_title,
                 n.full_name_en,
                 n.full_name_de,
                 n.id,
                 n.unit
             ORDER BY
                 risq.recipe_id,
                 n.nutrient_category_en,
                 n.id
         ),
     main AS
         (
             SELECT
                 b.*,
                 CASE WHEN b.locale = 'en' THEN 'Energy' ELSE 'Energie' END AS energy_title,
                 CASE WHEN b.locale = 'en' THEN 'Protein' ELSE 'Eiweiß' END AS protein_title,
                 CASE WHEN b.locale = 'en' THEN 'Fat' ELSE 'Fett' END AS fat_title,
                 CASE WHEN b.locale = 'en' THEN 'Saturated fatty acids' ELSE 'Gesättigte Fettsäuren:' END AS satfat_title,
                 CASE WHEN b.locale = 'en' THEN 'Polyunsaturated fatty acids' ELSE 'Ungesättigte Fettsäuren:' END AS unsatfat_title,
                 CASE WHEN b.locale = 'en' THEN 'Carbs' ELSE 'Kohlenhydrate' END AS carbs_title,
                 CASE WHEN b.locale = 'en' THEN 'Fibers' ELSE 'Ballastoffe' END AS fibers_title,
                 CASE WHEN b.locale = 'en' THEN 'Sugar' ELSE 'Zucker' END AS sugar_title,
                 CASE WHEN b.locale = 'en' THEN 'Salt' ELSE 'Salz' END AS salt_title,
                 CONCAT(ROUND(SUM(nutrient_gram_per_portion) FILTER( WHERE n.id = 66 )),'g') AS unsatfat_value,
                 CONCAT(ROUND(SUM(nutrient_gram_per_portion) FILTER( WHERE n.id IN(67,68) )),'g') AS satfat_value,
                 CONCAT(ROUND(SUM(nutrient_gram_per_portion) FILTER( WHERE n.id = 69 ) + SUM(nutrient_gram_per_portion) FILTER( WHERE n.id = 133 ) * 2),' kcal') AS energy_value,
                 CONCAT(ROUND(SUM(nutrient_gram_per_portion) FILTER( WHERE n.id = 70 )),' kcal') AS bls_energy_incl_fibers_value,
                 CONCAT(ROUND(CAST(SUM(nutrient_gram_per_portion) FILTER( WHERE n.id = 75 ) AS NUMERIC),1),'g') AS salt_value,
                 CONCAT(ROUND(SUM(nutrient_gram_per_portion) FILTER( WHERE n.id = 93 )),'g') AS sugar_value,
                 CONCAT(ROUND(SUM(nutrient_gram_per_portion) FILTER( WHERE n.id = 133 )),'g') AS fibers_value,
                 CONCAT(ROUND(SUM(nutrient_gram_per_portion) FILTER( WHERE n.id = 134 )),'g') AS protein_value,
                 CONCAT(ROUND(SUM(nutrient_gram_per_portion) FILTER( WHERE n.id = 135 )),'g') AS fat_value,
                 CONCAT(ROUND(SUM(nutrient_gram_per_portion) FILTER( WHERE n.id = 136 )),'g') AS carbs_value,
                 CASE WHEN b.locale = 'en' THEN 'Nutrients (per portion)' ELSE 'Nährwerte (pro Portion)' END AS nutrition_title
             FROM base b
                      LEFT JOIN nutrients n ON n.recipe_id = b.recipe_id
             GROUP BY
                 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27
             ORDER BY
                 user_id,
                 recipe_id
         ),
     odd AS
         (
             SELECT
                 9999 AS recipe_id,
                 user_id,
                 '/hide' AS da_first_name,
                 '/hide' AS da_last_name,
                 '/hide' AS email,
                 '/hide' AS locale,
                 '/hide' AS recipe_title,
                 '/hide' AS recipe_category,
                 '/hide' AS recipe_category_image_url,
                 '/hide' AS net_prep_time,
                 '/hide' AS gross_prep_time,
                 '/hide' AS portions,
                 '/hide' AS recipe_url,
                 '/hide' AS recipe_image_url,
                 '/hide' AS recipe_foot_note,
                 '/hide' AS recipe_ingredient_title,
                 '/hide' AS recipe_instruction_title,
                 '/hide' AS print_id,
                 '/hide' AS energy_title,
                 '/hide' AS protein_title,
                 '/hide' AS fat_title,
                 '/hide' AS satfat_title,
                 '/hide' AS unsatfat_title,
                 '/hide' AS carbs_title,
                 '/hide' AS fibers_title,
                 '/hide' AS sugar_title,
                 '/hide' AS salt_title,
                 '/hide' AS unsatfat_value,
                 '/hide' AS satfat_value,
                 '/hide' AS energy_value,
                 '/hide' AS energy_incl_fibers_value,
                 '/hide' AS salt_value,
                 '/hide' AS sugar_value,
                 '/hide' AS fiber_value,
                 '/hide' AS protein_value,
                 '/hide' AS fat_value,
                 '/hide' AS carbs_value,
                 '/hide' AS nutrition_title
             FROM main
             GROUP BY
                 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16
             HAVING
                         COUNT(DISTINCT recipe_id) % 2 = 1
         ),
     core AS
         (
             SELECT
                 main.*,
                 '/show' AS "show"
             FROM main
             UNION (SELECT *, '/hide' AS show FROM odd)
         )
SELECT c.*,
       array_agg(DISTINCT i.ingredient_list)                                                                    AS ingredients,
       array_agg(DISTINCT s.recipe_instructions
                 ORDER BY s.recipe_instructions)                                                                AS instruction,
       array_agg(DISTINCT p.ingredient_list ORDER BY p.ingredient_list DESC)                                    AS paos
FROM core c
         LEFT JOIN last_week_box_ids lwbi ON lwbi.user_id = c.user_id
         LEFT JOIN ingredients i ON i.recipe_id = c.recipe_id AND i.user_id = c.user_id
         LEFT JOIN instructions s ON s.recipe_id = c.recipe_id AND s.user_id = c.user_id
         LEFT JOIN paos p ON p.recipe_id = c.recipe_id AND p.user_id = c.user_id
GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,22,23,24,25,26,27,28,29,30,31,
         32,33,34,35,36,37,38,39,
         lwbi.box_id, c.recipe_id
ORDER BY lwbi.box_id DESC,
         c.recipe_id ASC
