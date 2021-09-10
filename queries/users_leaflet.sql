SELECT DISTINCT ON (u.id, lwplf.box_id)
	u.id AS user_id,
	CONCAT(EXTRACT(YEAR FROM now()),'-W',EXTRACT(WEEK FROM CURRENT_DATE + INTERVAL '7 day'),'_',lwplf.box_id,'_',lwplf.delivery_pickup_block,'_',ou.user_id) AS print_id,
	u.email,
	u.locale,
	dd.da_first_name,
	dd.da_last_name,
	CASE WHEN o2.is_first_order IS NULL THEN FALSE ELSE o2.is_first_order END AS is_first_order,
	CASE 
		WHEN u.locale = 'en' AND o2.is_first_order THEN CONCAT('Welcome ', dd.da_first_name, '!') 
		WHEN u.locale = 'en' AND o2.is_first_order = FALSE THEN CONCAT('Welcome back ', dd.da_first_name, '!') 
		WHEN u.locale = 'de' AND o2.is_first_order THEN CONCAT('Hi ', dd.da_first_name, '!')
		ELSE CONCAT('Wilkommen zurück, ', dd.da_first_name, '!')
	END AS salutation_text,
	CASE 
		WHEN u.locale = 'en' THEN 'Useful information:'	
		ELSE 'Nützliche Informationen:' 
	END AS info_title,
	CASE 
		WHEN u.locale = 'en' THEN 'Spread the word:'	
		ELSE 'Teile Deine Begeisterung:' 
	END AS referral_title,
	CASE 
		WHEN u.locale = 'en' THEN 'Help us get the word out there. The wyldr, the merrier! Share your unique code below and get 2 free portions for every new wyldr friend you brought - your friends will get 55% off their first box.'	
		ELSE 'Hilf‘ uns dabei, mehr Menschen auf die wylde Seite des Lebens zu holen! Je wyldr, desto besser: Teile Deinen persönlichen Code und erhalte für jede*n wylde*n Freund*in 2 Portionen kostenlos - Dein*e Freund*in erhält zusätzlich 55% Rabatt auf seine/ihre erste Box.' 
	END AS referral_text,	
	CASE 
		WHEN u.locale = 'en' THEN '1 FRIEND = 2 FREE PORTIONS'	
		ELSE '1 FREUND*IN = 2 PORTIONEN GRATIS' 
	END AS referral_promo_text,
	CASE 
		WHEN u.locale = 'en' THEN 'Send your friends this code:'	
		ELSE 'Verschicke den Code direkt an Deine Freund*innen' 
	END AS referral_sub_text1,
	CASE 
		WHEN u.locale = 'en' THEN 'Or scan to send on Whatsapp'	
		ELSE 'oder scanne den Code, um ihn per Whatsapp zu versenden!' 
	END AS referral_sub_text2,
	CONCAT('BE-WYLDR-',ou.user_id) AS referral_code,
	CASE 
		WHEN u.locale = 'en' THEN 'This week, plan the following remaining ingredients:'	
		ELSE 'Plane diese Woche folgende Zutaten für andere Gerichte ein:' 
	END AS smart_leftover_title,
	CASE 
		WHEN u.locale = 'en' THEN 'Why we avoid re-packaging...'
		ELSE 'Warum wir auf Kleinstverpackungen verzichten...'
	END AS repackaging_title1,
	CASE 
		WHEN u.locale = 'en' THEN '... and instead support clever food management!'
		ELSE '...und stattdessen cleveres Lebensmittelmanagement unterstützen!'
	END AS repackaging_title2,
	CASE WHEN u.locale = 'en' THEN '/show' ELSE '/hide' END AS info_text_en,
	CASE WHEN u.locale = 'de' THEN '/show' ELSE '/hide' END AS info_text_de,
	CASE WHEN u.locale = 'en' THEN '/show' ELSE '/hide' END AS top_icon_en,
	CASE WHEN u.locale = 'de' THEN '/show' ELSE '/hide' END AS top_icon_de,	
	CASE WHEN u.locale = 'en' THEN '/show' ELSE '/hide' END AS bot_icon_en,
	CASE WHEN u.locale = 'de' THEN '/show' ELSE '/hide' END AS bot_icon_de,
	CASE WHEN u.locale = 'en' THEN '/show' ELSE '/hide' END AS leftover_text_en,
	CASE WHEN u.locale = 'de' THEN '/show' ELSE '/hide' END AS leftover_text_de,
	CASE WHEN u.locale = 'en' AND o2.is_first_order THEN '/show' ELSE '/hide' END AS intro_text_new_en,
	CASE WHEN u.locale = 'de' AND o2.is_first_order THEN '/show' ELSE '/hide' END AS intro_text_new_de,
	CASE WHEN u.locale = 'en' AND (o2.is_first_order = FALSE OR is_first_order IS NULL) THEN '/show' ELSE '/hide' END AS intro_text_rec_en,
	CASE WHEN u.locale = 'de' AND (o2.is_first_order = FALSE OR is_first_order IS NULL) THEN '/show' ELSE '/hide' END AS intro_text_rec_de
FROM household_recipe_portions_last_week hrplw 
LEFT JOIN users u ON u.id = hrplw.household_owner_user_id 
LEFT JOIN delivery_details dd ON dd.id = u.delivery_details_id 
LEFT JOIN orders_users ou ON ou.user_id = u.id AND ou.deleted_at IS NULL
LEFT JOIN (SELECT id, is_first_order FROM orders WHERE status = 'charged' AND deleted_at IS NULL AND is_first_order) o2 ON o2.id = ou.order_id 
LEFT JOIN last_week_packing_list_file lwplf ON u.id = lwplf.user_id
ORDER BY lwplf.box_id ASC
;
