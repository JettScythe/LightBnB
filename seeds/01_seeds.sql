INSERT INTO users (NAME, EMAIL, PASSWORD) 
  VALUES ('Phillip DeFranco', 'sxephil@defranco.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Ross Ulbricht', 'dreadpirateroberts@freeross.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Miranda Cosgrove', 'carly@icarly.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (TITLE, DESCRIPTION, THUMBNAIL_PHOTO_URL, COVER_PHOTO_URL,  COST_PER_NIGHT,  PARKING_SPACES,  NUMBER_OF_BATHROOMS,  NUMBER_OF_BEDROOMS, COUNTRY, STREET, CITY, PROVINCE, POST_CODE, ACTIVE) 
  VALUES ('Habit mix', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 46058, 0, 5, 6, 'Canada', '513 Powov Grove', 'Jaebvap', 'Ontario', '38051', TRUE), 
  ('Blank Corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 85234, 6, 6, 7, 'Canada', '1650 Hejto Center', 'Genwezuj', 'Newfoundland And Labrador', '44583', TRUE),
  ('Speed Lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 93061, 6, 4, 8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', '28142', TRUE);


INSERT INTO reservations (START_DATE, END_DATE, PROPERTY_ID, GUEST_ID) 
  VALUES ('2018-09-11', '2018-09-26', 2, 3), ('2019-01-04', '2019-02-01', 2, 2), ('2021-10-01', '2021-10-14', 1, 4), ('2014-10-21', '2014-10-21', 3, 5);


INSERT INTO property_reviews (GUEST_ID, PROPERTY_ID, RESERVATION_ID, RATING, MESSAGE)
  VALUES (1, 1, 1, 3, 'messages'), (1, 2, 2, 4, 'messages'), (2, 1, 3, 4, 'messages'), (3, 3, 4, 3, 'messages');