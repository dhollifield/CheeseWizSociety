USE [master]
GO
If DB_ID('CheeseWizSociety') IS NULL
CREATE DATABASE [CheeseWizSociety]
GO
USE [CheeseWizSociety]
GO

DROP TABLE IF EXISTS users
DROP TABLE IF EXISTS cheeses
DROP TABLE IF EXISTS posts
DROP TABLE IF EXISTS comments
DROP TABLE IF EXISTS recipes
DROP TABLE IF EXISTS recipeTypes
DROP TABLE IF EXISTS follows
DROP TABLE IF EXISTS favoriteCheeses


CREATE TABLE [users] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirebaseUid] nvarchar(255),
  [UserName] nvarchar(255),
  [Email] nvarchar(255),
  [ImageUrl] nvarchar(255),
  [Type] nvarchar(255)
)
GO

CREATE TABLE [cheeses] (
  [Id] integer PRIMARY KEY IDENTITY,
  [CheeseName] nvarchar(255),
  [ImageUrl] nvarchar(255),
  [Description] nvarchar(255)
)
GO

CREATE TABLE [posts] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Title] nvarchar(255),
  [ImageUrl] nvarchar(255),
  [Caption] varchar(8000),
  [DateCreated] datetime,
  [UserId] integer
)
GO

CREATE TABLE [comments] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserId] integer,
  [PostId] integer,
  [Comment] varchar(8000)
)
GO

CREATE TABLE [recipes] (
  [Id] integer PRIMARY KEY IDENTITY,
  [RecipeName] nvarchar(255),
  [ImageUrl] nvarchar(255),
  [RecipeTypeId] integer,
  [Ingredients] varchar(8000),
  [Instructions] varchar(8000),
  [UserId] integer
)
GO

CREATE TABLE [recipeTypes] (
  [Id] integer PRIMARY KEY IDENTITY,
  [RecipeType] nvarchar(255)
)
GO

CREATE TABLE [follows] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FollowerId] integer,
  [FollowedId] integer
)
GO

CREATE TABLE [favoriteCheeses] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserId] integer,
  [CheeseId] integer
)
GO

ALTER TABLE [posts] ADD FOREIGN KEY ([UserId]) REFERENCES [users] ([Id])
GO

ALTER TABLE [favoriteCheeses] ADD FOREIGN KEY ([UserId]) REFERENCES [users] ([Id])
GO

ALTER TABLE [favoriteCheeses] ADD FOREIGN KEY ([CheeseId]) REFERENCES [cheeses] ([Id])
GO

ALTER TABLE [follows] ADD FOREIGN KEY ([FollowerId]) REFERENCES [users] ([Id])
GO

ALTER TABLE [follows] ADD FOREIGN KEY ([FollowedId]) REFERENCES [users] ([Id])
GO

ALTER TABLE [recipes] ADD FOREIGN KEY ([UserId]) REFERENCES [users] ([Id])
GO

ALTER TABLE [recipes] ADD FOREIGN KEY ([RecipeTypeId]) REFERENCES [recipeTypes] ([Id])
GO

ALTER TABLE [comments] ADD FOREIGN KEY ([UserId]) REFERENCES [users] ([Id])
GO

ALTER TABLE [comments] ADD FOREIGN KEY ([PostId]) REFERENCES [posts] ([Id])
GO


INSERT INTO users (FirebaseUid, UserName, Email, ImageUrl, [Type]) VALUES ('7K03kD0LX9Sai6fpDUX1yV1RyPo1', 'Deanna Hollifield', 'dhollifield@gmail.com', 'https://avatars.githubusercontent.com/u/107222205?s=400&u=e4891500412236171c27821dd29aa0bafe54fbdf&v=4', 'email')
INSERT INTO users (FirebaseUid, UserName, Email, ImageUrl, [Type]) VALUES ('3iTgI1VBXNcFwQjhoJiqtVYq4U82', 'Michael Hollifield', 'michaeljay@me.com', 'https://media.licdn.com/dms/image/D4E03AQEBrkHM54_Cbw/profile-displayphoto-shrink_800_800/0/1678904634942?e=1690416000&v=beta&t=KSqAbfvSKqgqNC9Y_DRwIXOY_ZlkCJDoNQ2KLeCzrho', 'email')
INSERT INTO users (FirebaseUid, UserName, Email, ImageUrl, [Type]) VALUES ('Dq18WBuucOX59fE15uRx8fwBUv92', 'Chester Cheetah', 'cheesin@cheetos.com', 'https://i1.sndcdn.com/avatars-000576550848-tb8sib-t500x500.jpg', 'email')

INSERT INTO posts (Title, ImageUrl, Caption, DateCreated, UserId) VALUES ('Good Day for Cheddar', 'https://media.istockphoto.com/id/470427615/photo/organic-shredded-sharp-cheddar-cheese.jpg?s=612x612&w=0&k=20&c=oZ8R4WrLpg7qM_DCed3SLoNZ0ow77_2X9iOds-0NGtA=', 'I was having a horrible day. Nothing was going right. I left the house without my coffee and someone cut me off as I was merging onto 440. Then I remembered I had a delicious chunk of cheddar cheese in my lunchbox that was like manna from heaven in my time of need. There is nothing better than a good chunk of cheddar!','2023-04-13 13:23:44', 1)
INSERT INTO posts (Title, ImageUrl, Caption, DateCreated, UserId) VALUES ('Good Queso', 'https://media.30seconds.com/tip/lg/Easy-Queso-Blanco-Cheese-Dip-Recipe-20403-5abbb6fd11-1615231444.jpg', 'Amigos in Spring Hill has the best queso around!', '2023-05-01 09:24:12', 3)
INSERT INTO posts (Title, ImageUrl, Caption, DateCreated, UserId) VALUES ('American Cheese Is Underrated', 'https://assets.kraftfoods.com/assets/images/Mar_11/Americas-Favorite-Grilled-Cheese-Sandwich_52507.jpg', 'When I''m feeling nostalgic and want a taste of my childhood, there is nothing like a grilled cheese sandwich made with a couple of slices of Kraft American Cheese. Brought back so many memories.', '2023-04-30 12:15:11', 2)

INSERT INTO comments (UserId, PostId, Comment) 
VALUES (2, 1, 'I''m so glad you had that cheese with you to save the day!')
INSERT INTO comments (UserId, PostId, Comment) 
VALUES (3, 1, 'What you really needed were some Flamin'' Hot Cheetos...')
INSERT INTO comments (UserId, PostId, Comment)
VALUES (1, 3, 'I do love a good grilled cheese sandwich. YUM.')
INSERT INTO comments (UserId, PostId, Comment)
VALUES (2, 2, 'I agree!')

INSERT INTO recipeTypes (RecipeType) VALUES ('Breakfasts')
INSERT INTO recipeTypes (RecipeType) VALUES ('Main Dishes & Casseroles')
INSERT INTO recipeTypes (RecipeType) VALUES ('Lunches')
INSERT INTO recipeTypes (RecipeType) VALUES ('Appetizers')
INSERT INTO recipeTypes (RecipeType) VALUES ('Soups')
INSERT INTO recipeTypes (RecipeType) VALUES ('Salads')
INSERT INTO recipeTypes (RecipeType) VALUES ('Sides')
INSERT INTO recipeTypes (RecipeType) VALUES ('Breads')
INSERT INTO recipeTypes (RecipeType) VALUES ('Desserts')
INSERT INTO recipeTypes (RecipeType) VALUES ('Dips, Sauces & Spreads')

INSERT INTO recipes (RecipeName, ImageUrl, RecipeTypeId, Ingredients, Instructions, UserId)
VALUES ('Cheese Enchiladas', 'https://lilluna.com/wp-content/uploads/2017/10/cheese-enchiladas-resize-2.jpg', 2, '2 Tbsp vegetable oil, 4 Tbsp all-purpose flour, 3 Tbsp chili powder, 1/2 tsp garlic powder, 1/4 tsp oregano, 1/2 tsp salt, 1/2 tsp cumin, 2 cups chicken broth, corn tortillas, Monterey Jack cheese', '1. Add oil to pot and heat on Medium. Pour in flour and whisk together and cook for 1-2 minutes. 2. Add chili powder, garlic powder, cumin, salt and oregano and mix until clumpy. Pour in chicken broth, whisking the entire time and until there are no more clumps. Heat for 15 minutes or until thickened. 3. After you have made your sauce, you will want to dip your corn tortillas in the sauce until they are soft and immediately put it into a greased 11x7 pan. 4. From there you will add cheese (I use the Mexican Blended Cheese), roll it up and push it to the end of the pan. 5. Continue doing this with your tortillas until your pan is full. From there you will pour the excess sauce over your tortillas. Sprinkle the top with more cheese. (You can also prepare this in advance and refrigerate until ready to cook). 6. Bake at 350 degrees for 20-25 minutes.', 1)

INSERT INTO recipes (RecipeName, ImageUrl, RecipeTypeId, Ingredients, Instructions, UserId)
VALUES ('Cheetos Flamin'' Hot Chocolate Gingerbread Cookies', 'https://www.cheetos.com/sites/cheetos.com/files/2021-12/CHEETOS%20GINGERBREAD%20COOKIES-032_3x2%281%29.jpg', 9, '1 cup Flamin'' Hot Cheetos, 2 cups all-purpose flour, 1/3 cup cocoa powder, 2 tsp ground cinnamon, 2 tsp ground cloves, 2 tsp ground ginger, 1 tsp baking soda, 1/2 tsp baking powder, 1/4 tsp salt, 3/4 cup unsalted butter, at room temperature, 1/4 cup packed brown sugar, 1 egg, 1/4 cup molasses, 1 tsp vanilla extract, 1/2 cup semi-sweet chocolate chunks, 1/4 cup turbinado sugar', '1. In food processor, pulse Cheetos to make fine crumbs (you should have about 1/3 cup crumbs); set aside. 2. In bowl, sift together CHEETOS® crumbs, flour, cocoa powder, cinnamon, cloves, ginger, baking soda, baking powder and salt; set aside. 3. Using electric mixer, beat butter and brown sugar until light and fluffy, scraping down sides of bowl as needed. Beat in egg until combined. Beat in molasses and vanilla. Stir in flour mixture; beat just until blended. Fold in chocolate chunks. Cover and refrigerate for 1 hour. 4. Preheat oven to 375 degrees. Evenly roll dough into 1 1/2-inch balls; place on parchment paper–lined baking sheets, about 2 inches apart. Flatten tops slightly; sprinkle evenly with turbinado sugar. 5. Bake in batches for 10 to 12 minutes or until golden and crisp around edges and tops are just set. Let cool completely on racks.', 3)

INSERT INTO recipes (RecipeName, ImageUrl, RecipeTypeId, Ingredients, Instructions, UserId)
VALUES ('Grilled Cheese Sandwich','https://assets.kraftfoods.com/recipe_images/opendeploy/505975_1_1_retail-31d449b63185dd73f2bd5347d44349b36013d94e_642x428.jpg', 3, '2 slices white bread, 2 KRAFT Singles, 2 tsp butter or margarine, softened', '1. Fill bread slices with Singles. 2. Spread outside of sandwich with butter or margarine. 3. Cook in skillet over medium heat 3 minutes on each side or until Singles are melted and sandwich is golden brown on both sides', 2)

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('American', 'https://www.usdairy.com/optimize/getmedia/6ab03180-cc90-4a03-a339-13b540ecc8a5/american.jpg.jpg.aspx?format=webp', 'American is a creamy, smooth cheese made from blending natural cheeses. It comes in several forms including individually wrapped cheese slices, small pre-sliced blocks and large blocks. It melts well.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Asiago', 'https://www.usdairy.com/optimize/getmedia/abfd64df-ff63-4597-8344-bd95bdef9224/asiago.jpg.jpg.aspx?format=webp', 'Asiago, a nutty-flavored cheese, comes in two forms: fresh and mature. The fresh has an off-white color and is smoother and milder, while mature Asiago is yellowish and somewhat crumbly. Depending on its age, Asiago can be grated, melted or sliced.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Blue Cheese', 'https://www.usdairy.com/optimize/getmedia/005970ec-c5a5-44fa-b2ad-ea2b079464bc/blue.jpg.jpg.aspx?format=webp', 'Blue is a general name for cheeses that were made with Penicillium cultures, which creates ''blue'' spots or veins. Blue cheese has a distinct smell and, what some consider, an acquired taste. Blue cheeses can be eaten crumbed or melted.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Bocconcini', 'https://www.usdairy.com/optimize/getmedia/186bd23d-43ef-46c6-8083-18d4a289232d/bocconcini.jpg.jpg.aspx?format=webp', 'Meaning “little bites,” bocconcini are egg-sized balls of mozzarella cheese. The cheese is white, rindless, unripened, and elastic in texture with a sweet, buttery taste. Bocconcini can be enjoyed as they are or melted.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Brie', 'https://www.usdairy.com/optimize/getmedia/cbcdbb91-0d38-4d8d-87da-cf45564c0638/brie.jpg.jpg.aspx?format=webp', 'Brie is a soft, white cheese. It comes in a wheel, sometimes in a small wooden box, and is considered a great dessert cheese. Experts recommend enjoying it at room temperature.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Burrata', 'https://www.usdairy.com/optimize/getmedia/eca5d7b0-a7c8-4560-87e4-90d142fd00ea/burrata.jpg.jpg.aspx?format=webp', 'Burrata is a fresh cheese featuring a thin layer of cheese with a mixture of stringy curd and fresh cream on the inside. It has a rich flavor and goes well with salads, crusty bread and Italian dishes.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Camembert', 'https://www.usdairy.com/optimize/getmedia/226b66fb-3705-4d0c-a669-5f170ed134d3/camembert.jpg.jpg.aspx?format=webp', 'Fresh Camembert cheese is bland, hard and crumbly, but becomes smoother with a runny interior as it ages. It has a rich, buttery flavor with a rind that’s meant to be eaten.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Cheddar', 'https://www.usdairy.com/optimize/getmedia/6b60d6f4-a547-4b23-aa91-0f4369df148d/cheddar.jpg.jpg.aspx?format=webp', 'This popular cheese comes in many variations. Its flavor can range from creamy to sharp, and its color can run between a natural white to pumpkin orange. A Cheddar''s texture changes as it ages, becoming drier and more crumbly.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Cheese Curds', 'https://www.usdairy.com/optimize/getmedia/7aae1c95-20d0-4079-bd97-780fccf9f964/cheesecurds.jpg.jpg.aspx?format=webp', 'Popular in the United States and Canada, cheese curds have a springy or rubbery texture and can vary in flavor. They can be eaten as a snack or used in recipes like Poutine.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Colby', 'https://www.usdairy.com/optimize/getmedia/d35dac4f-388a-406c-ac1e-145490ba2de8/colby.jpg.jpg.aspx?format=webp', 'While it may look like Cheddar, Colby has a softer texture and less tangy taste. Sometimes it’s blended with other different cheeses, like Monterey Jack, to make Colby Jack.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Colby-Jack Cheese', 'https://www.usdairy.com/optimize/getmedia/8aac1900-1976-498f-9802-fe857effb6e0/colbyjack.jpg.jpg.aspx?format=webp', 'This orange and white cheese is a combination of orange Colby cheese and white Monterey Jack cheese. It’s often used on grilled sandwiches, cooked vegetables and other warm dishes because it melts well.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Cold-Pack Cheese', 'https://www.usdairy.com/optimize/getmedia/bd75b393-068d-4e01-aec3-c407a4915647/coldpacked.jpg.jpg.aspx?format=webp', 'Cold Pack cheese is a combination of two or more types of fresh and aged natural cheeses. Sometimes consisting of a Swiss and cheddar mix, they are often soft, creamy and spreadable.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Cojita', 'https://www.usdairy.com/optimize/getmedia/683d27e1-af23-48c0-9c69-895c4685458c/cotija.jpg.jpg.aspx?format=webp', 'This hard, crumbly cheese begins as mild and salty, and becomes tangier as it ages. It doesn’t melt, so it’s used for grating on soups, tacos, tostadas, and more.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Cottage Cheese', 'https://www.usdairy.com/optimize/getmedia/20141283-0a74-41ed-8697-a9ca3daaace2/cottage.jpg.jpg.aspx?format=webp', 'Cottage cheese is made when curds are separated from the whey, and unlike other kinds of cheeses, it isn’t pressed so it remains creamy and lumpy. It can be eaten on its own, with fruit, on toast, and more.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Cream Cheese', 'https://www.usdairy.com/optimize/getmedia/d2917b28-20cc-40ec-9bbd-85cc0d49cebd/creamcheese.jpg.jpg.aspx?format=webp', 'Cream cheese is made by adding cream to milk. It comes in a block, sometimes with added flavors, and spreads smoothly. The flavor is light and slightly tangy.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Emmental', 'https://www.usdairy.com/optimize/getmedia/9091b0fa-4e5c-42cc-90ca-34614818982d/emmental.jpg.jpg.aspx?format=webp', 'When people think of “Swiss cheese,” they’re likely thinking of Emmental (also known as Emmentaler). When the cheese’s curds are cooked and pressed together, bubbles form, which leave the holes in the cheese. It’s sweet, tangy and melts well.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Farmer''s', 'https://www.usdairy.com/optimize/getmedia/2b2129bc-53e2-49c1-a907-6c84bb1598ac/farmers.jpg.jpg.aspx?format=webp', 'Farmer’s cheese is made when cottage cheese is squeezed to remove the extra moisture. It may then be rolled in herbs or smoked meats. Its style varies depending on its maker.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Feta', 'https://www.usdairy.com/optimize/getmedia/5496775f-c20e-4759-92b6-ab851fefb25f/feta.jpg.jpg.aspx?format=webp', 'While traditionally made with sheep’s or goat’s milk, cow’s milk also can be used to make Feta. It’s tangy and crumbly.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Fresh Mozzarella', 'https://www.usdairy.com/optimize/getmedia/d2917b28-20cc-40ec-9bbd-85cc0d49cebd/creamcheese.jpg.jpg.aspx?format=webp', 'Fresh mozzarella is a fresh cheese made by stretching its cheese curds before rolling them into balls. To keep them fresh, they’re packed in water. Mozzarella is a versatile and delicious cheese with its milky flavor and gooey texture.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Gorgonzola', 'https://www.usdairy.com/optimize/getmedia/1c385298-ffff-4d76-9431-85db91e0d225/gorgonzola.jpg.jpg.aspx?format=webp', 'Gorgonzola is one of the world''s oldest types of blue cheese. It has a crumbly and soft texture, and its taste can range from creamy to sharp.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Gouda', 'https://www.usdairy.com/optimize/getmedia/8a771f9e-49b0-4d73-82aa-d0ec912f87a0/gouda_wedge.jpg?format=webp', 'A semi-hard to hard cheese with a smooth flavor, Gouda comes in several types, depending on its age. Gouda can be grated, sliced, cubed and melted.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Gruyere', 'https://www.usdairy.com/optimize/getmedia/d2ffe6e8-3d57-4904-8dc6-6e415213d5e0/gruyere.jpg.jpg.aspx?format=webp', 'This slightly grainy cheese is known for its fruity, earthy and nutty flavors. It melts well and adds a savory flavor without overpowering others. It’s commonly used on sandwiches, in hot meals, over French onion soup and more.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Halloumi', 'https://www.usdairy.com/optimize/getmedia/6bb1efb3-99a5-4f3e-9d8d-8c3c1cb3be5a/halloumi.jpg.jpg.aspx?format=webp', 'Halloumi is known for its high melting point so it''s often fried or grilled. The texture is similar to mozzarella, while its taste is strong and salty. Once cooked, it becomes less salty and creamier.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Havarti', 'https://www.usdairy.com/optimize/getmedia/c067cd49-507e-4dd5-a731-c1e16ad10302/havarti.jpg.jpg.aspx?format=webp', 'Havarti, a semi-soft cheese, has a buttery aroma and taste. It can be sliced, grilled or melted.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Jarlsberg', 'https://www.usdairy.com/optimize/getmedia/8648f276-82fd-4bb9-8c99-45a1e2740e36/jarlsberg.jpg.jpg.aspx?format=webp', 'Jarlsberg is a mild, semi-soft cheese that resembles Emmental thanks to its open and irregular holes. This meltable cheese works well in hot dishes, on sandwiches and more.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Limburger', 'https://www.usdairy.com/optimize/getmedia/98aed860-7543-48c6-8599-febbaf0df502/limburger.jpg.jpg.aspx?format=webp', 'Known for its pungent odor, Limburger is a semi-soft cheese with a mild flavor despite its stinky aroma. The cheese, which softens with age, goes well with dark rye bread and onion.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Mascarpone', 'https://www.usdairy.com/optimize/getmedia/788a2efb-4472-45e9-a2fd-e88fa24c66f2/marscapone.jpg.jpg.aspx?format=webp', 'Mascarpone is a thick, soft cheese with a very high fat content. Known for its smooth, creamy to buttery texture and flavor, it can be used in sweet and savory dishes. ')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Monterey Jack', 'https://www.usdairy.com/optimize/getmedia/9b9859e3-80ac-4d2b-801c-c99ff5bf2a3f/montereyjack.jpg.jpg.aspx?format=webp', 'Monterey Jack has a mild and buttery flavor with a bit of tang, It melts well and is also perfect for burgers.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Mozzarella', 'https://www.usdairy.com/optimize/getmedia/98480325-2ad1-4103-b4e8-29afb4e7541d/mozzarella_shreds.jpg?format=webp', 'Similar to fresh mozzarella, this mozzarella is pulled and kneaded into strands, which contributes to its stretch ability. It melts well and is commonly used on pizza.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Muenster', 'https://www.usdairy.com/optimize/getmedia/edcfdcb0-528e-4091-9f0f-aca24065ba62/muenster.jpg.jpg.aspx?format=webp', 'Muenster is a smooth, pale yellow cheese with an orange rind. Its taste can vary from mild and bland to sharp. Since it melts well, it can be used in sandwiches, on cheeseburgers and more.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Neufchatel', 'https://www.usdairy.com/optimize/getmedia/27b34f9a-b814-4d55-b01f-3d1d328d84bb/neufchatel.jpg.jpg.aspx?format=webp', 'This soft, white cheese looks similar to Camembert, but is made in many forms, shapes and sizes. Unlike similar cheeses, Neufchatel has a grainy texture.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Paneer', 'https://www.usdairy.com/optimize/getmedia/e8572bdf-0a2a-4204-8b69-fdaa7ef55d67/paneer.jpg.jpg.aspx?format=webp', 'Paneer is a fresh cheese often used in South Asian Cuisine. It’s moist and soft, crumbly in texture, and is made in a process similar to ricotta.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Parmesan', 'https://www.usdairy.com/optimize/getmedia/98480325-2ad1-4103-b4e8-29afb4e7541d/mozzarella_shreds.jpg?format=webp', 'Parmesan has a hard, gritty texture and tastes fruity and nutty. It can be grated over pastas, used in soups and more.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Pepper Jack', 'https://www.usdairy.com/optimize/getmedia/17493c89-42e3-4549-a9e7-1b4cdf99949c/pepperjack.jpg.jpg.aspx?format=webp', 'Pepper Jack is a variety of Monterey Jack that’s flavored with peppers and often other vegetables and spices to give it a kick. While this semi-soft cheese is spicy, it’s also buttery. As a result, it goes well with quesadillas, hamburgers and more.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Provolone', 'https://www.usdairy.com/optimize/getmedia/fcb503cd-a23e-4b48-a981-9927dc751b25/provolone.jpg.jpg.aspx?format=webp', 'This semi-hard cheese is pale yellow to white and has a sweetish taste. It can come in smoked and unsmoked varieties, and is a staple for many different classic sandwiches. It also makes for great grilled cheese.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Ricotta', 'https://www.usdairy.com/optimize/getmedia/67a1ed57-ff27-4b89-b9c1-13dad4bb4f02/ricotta.jpg.jpg.aspx?format=webp', 'This fresh cheese is smoother than cottage cheese and while firm, it’s not solid. It has a light flavor that works well with dishes from lasagna to cheesecake and beyond.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Romano', 'https://www.usdairy.com/optimize/getmedia/d6629627-1f2c-4eb1-94e9-fc6f5b2b3b2a/romano.jpg.jpg.aspx?format=webp', 'is hard cheese, when made with cow’s milk, can have a tangier flavor than Parmesan. It’s often grated over pasta, salads or into sauces.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('String Cheese', 'https://www.usdairy.com/optimize/getmedia/1f322f1e-81de-464c-9d1c-2b73c3003f04/string.jpg.jpg.aspx?format=webp', 'Traditionally, it’s a type of mozzarella made into small logs that can be pulled apart as strings. It comes in a variety of flavors and is often a staple of a good school lunch.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Swiss', 'https://www.usdairy.com/optimize/getmedia/b5108b6f-59c3-4cc4-b1d5-4b9b0d1e0c54/swiss.jpg.jpg.aspx?format=webp', 'This semi-hard cheese is pale yellow to white and has a sweetish taste. It can come in smoked and unsmoked varieties, and is a staple for many different classic sandwiches. It also makes for great grilled cheese.')

INSERT INTO cheeses (CheeseName, ImageUrl, [Description])
VALUES ('Ricotta', 'https://www.usdairy.com/optimize/getmedia/67a1ed57-ff27-4b89-b9c1-13dad4bb4f02/ricotta.jpg.jpg.aspx?format=webp', 'Swiss is actually a generic name for a type of cheese, including Emmental and baby Swiss varieties. It’s recognized by its holes and light or pale yellow color. It pairs well with fruits and vegetables, and on sandwiches.')

INSERT INTO favoriteCheeses (UserId, CheeseId)
VALUES (1, 8)

INSERT INTO favoriteCheeses (UserId, CheeseId)
VALUES (1, 21)

INSERT INTO favoriteCheeses (UserId, CheeseId)
VALUES (1, 22)

INSERT INTO favoriteCheeses (UserId, CheeseId)
VALUES (2, 1)

INSERT INTO favoriteCheeses (UserId, CheeseId)
VALUES (1, 34)

INSERT INTO favoriteCheeses (UserId, CheeseId)
VALUES (1, 28)

INSERT INTO favoriteCheeses (UserId, CheeseId)
VALUES (3, 34)

INSERT INTO favoriteCheeses (UserId, CheeseId)
VALUES (3, 12)

INSERT INTO favoriteCheeses (UserId, CheeseId)
VALUES (3, 25)

INSERT INTO Follows (FollowerId, FollowedId)
VALUES (1, 2)

INSERT INTO Follows (FollowerId, FollowedId)
VALUES (1, 3)

INSERT INTO Follows (FollowerId, FollowedId)
VALUES (2, 3)

INSERT INTO Follows (FollowerId, FollowedId)
VALUES (2, 1)

INSERT INTO Follows (FollowerId, FollowedId)
VALUES (3, 2)