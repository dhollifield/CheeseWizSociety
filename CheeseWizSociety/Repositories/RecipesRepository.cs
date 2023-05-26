using CheeseWizSociety.Models;
using CheeseWizSociety.Utils;
using System.Security.Cryptography;

namespace CheeseWizSociety.Repositories;

public class RecipesRepository : BaseRepository, IRecipesRepository
{
    public RecipesRepository(IConfiguration configuration) : base(configuration) { }

    public List<Recipes> GetAllRecipes()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                          SELECT r.Id
	                            ,r.RecipeName
	                            ,r.ImageUrl
	                            ,r.Ingredients
	                            ,r.Instructions
	                            ,u.Id AS UserId
                                ,u.UserName
	                            ,rt.Id AS RecipeTypeId
	                            ,rt.RecipeType
                            FROM Recipes r
                            JOIN Users u
                              ON r.UserId = u.Id
                            JOIN RecipeTypes rt
                              ON r.RecipeTypeId = rt.Id";

                var reader = cmd.ExecuteReader();

                var recipes = new List<Recipes>();

                while (reader.Read())
                {
                    recipes.Add(new Recipes()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        RecipeName = DbUtils.GetString(reader, "RecipeName"),
                        ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                        Ingredients = DbUtils.GetString(reader, "Ingredients"),
                        Instructions = DbUtils.GetString(reader, "Instructions"),
                        RecipeTypeId = DbUtils.GetInt(reader, "RecipeTypeId"),
                        RecipeType = new RecipeTypes()
                        {
                            Id = DbUtils.GetInt(reader, "RecipeTypeId"),
                            RecipeType = DbUtils.GetString(reader, "RecipeType")
                        },
                        UserId = DbUtils.GetInt(reader, "UserId"),
                        User = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            UserName = DbUtils.GetString(reader, "UserName")
                        }
                    });
                }
                reader.Close();
                return recipes;
            }
        }
    }

    public Recipes GetRecipeById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                          SELECT r.Id
	                            ,r.RecipeName
	                            ,r.ImageUrl
	                            ,r.Ingredients
	                            ,r.Instructions
	                            ,u.Id AS UserId
                                ,u.UserName
	                            ,rt.Id AS RecipeTypeId
	                            ,rt.RecipeType
                            FROM Recipes r
                       LEFT JOIN Users u
                              ON r.UserId = u.Id
                       LEFT JOIN RecipeTypes rt
                              ON r.RecipeTypeId = rt.Id
                           WHERE r.Id = @id";

                cmd.Parameters.AddWithValue("id", id);
                var reader = cmd.ExecuteReader();
                Recipes recipe = null;

                while (reader.Read())
                {
                    recipe = new Recipes()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        RecipeName = DbUtils.GetString(reader, "RecipeName"),
                        ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                        Ingredients = DbUtils.GetString(reader, "Ingredients"),
                        Instructions = DbUtils.GetString(reader, "Instructions"),
                        RecipeTypeId = DbUtils.GetInt(reader, "RecipeTypeId"),
                        RecipeType = new RecipeTypes()
                        {
                            Id = DbUtils.GetInt(reader, "RecipeTypeId"),
                            RecipeType = DbUtils.GetString(reader, "RecipeType")
                        },
                        UserId = DbUtils.GetInt(reader, "UserId"),
                        User = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            UserName = DbUtils.GetString(reader, "UserName")
                        }
                    };
                }
                conn.Close();
                return recipe;
            }
        }
    }

    public void AddRecipe(Recipes recipe)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                     INSERT INTO Recipes
                                (RecipeName
                                ,ImageUrl
                                ,RecipeTypeId
                                ,Ingredients
                                ,Instructions
                                ,UserId)
                          OUTPUT INSERTED.Id
                          VALUES (@RecipeName
                                 ,@ImageUrl
                                 ,@RecipeTypeId
                                 ,@Ingredients
                                 ,@Instructions
                                 ,@UserId)";

                DbUtils.AddParameter(cmd, "@RecipeName", recipe.RecipeName);
                DbUtils.AddParameter(cmd, "@ImageUrl", recipe.ImageUrl);
                DbUtils.AddParameter(cmd, "@RecipeTypeId", recipe.RecipeTypeId);
                DbUtils.AddParameter(cmd, "@Ingredients", recipe.Ingredients);
                DbUtils.AddParameter(cmd, "@Instructions", recipe.Instructions);
                DbUtils.AddParameter(cmd, "@UserId", recipe.UserId);

                recipe.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void UpdateRecipe(Recipes recipe)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                          UPDATE Recipes
                             SET RecipeName = @RecipeName
                                ,ImageUrl = @ImageUrl
                                ,RecipeTypeId = @RecipeTypeId
                                ,Ingredients = @Ingredients
                                ,Instructions = @Instructions
                                ,UserId = @UserId
                           WHERE Id = @Id;";

                DbUtils.AddParameter(cmd, "@RecipeName", recipe.RecipeName);
                DbUtils.AddParameter(cmd, "@ImageUrl", recipe.ImageUrl);
                DbUtils.AddParameter(cmd, "@RecipeTypeId", recipe.RecipeTypeId);
                DbUtils.AddParameter(cmd, "@Ingredients", recipe.Ingredients);
                DbUtils.AddParameter(cmd, "@Instructions", recipe.Instructions);
                DbUtils.AddParameter(cmd, "@UserId", recipe.UserId);
                DbUtils.AddParameter(cmd, "@Id", recipe.Id);

                cmd.ExecuteNonQuery();
            }
        }
    }

    public void DeleteRecipe(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "DELETE FROM Recipes WHERE Id = @Id";
                DbUtils.AddParameter(cmd, "@Id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}
