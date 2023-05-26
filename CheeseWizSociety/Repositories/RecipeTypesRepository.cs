using CheeseWizSociety.Models;
using CheeseWizSociety.Utils;

namespace CheeseWizSociety.Repositories;

public class RecipeTypesRepository : BaseRepository, IRecipeTypesRepository
{
    public RecipeTypesRepository(IConfiguration configuration) : base(configuration) { }

    public List<RecipeTypes> GetAllRecipeTypes()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                          SELECT Id
                                ,RecipeType
                            FROM RecipeTypes";

                var reader = cmd.ExecuteReader();

                var recipeTypes = new List<RecipeTypes>();

                while (reader.Read())
                {
                    recipeTypes.Add(new RecipeTypes()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        RecipeType = DbUtils.GetString(reader, "RecipeType")
                    });
                }
                reader.Close();
                return recipeTypes;
            }
        }
    }

    public RecipeTypes GetRecipeTypeById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                          SELECT Id
                                ,RecipeType
                            FROM RecipeTypes
                           WHERE Id = @id";

                cmd.Parameters.AddWithValue("id", id);
                var reader = cmd.ExecuteReader();
                RecipeTypes recipeTypes = null;

                while (reader.Read())
                {
                    recipeTypes = new RecipeTypes()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        RecipeType = DbUtils.GetString(reader, "RecipeType")
                    };
                }
                reader.Close();
                return recipeTypes;
            }
        }
    }

    public void AddRecipeType(RecipeTypes recipeType)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                     INSERT INTO RecipeTypes (RecipeType)
                          OUTPUT INSERTED.Id
                          VALUES (@RecipeType)";

                DbUtils.AddParameter(cmd, "@RecipeType", recipeType.RecipeType);

                recipeType.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void UpdateRecipeType(RecipeTypes recipeType)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                          UPDATE RecipeTypes
                             SET RecipeType = @RecipeType
                           WHERE Id = @Id";

                DbUtils.AddParameter(cmd, "@RecipeType", recipeType.RecipeType);
                DbUtils.AddParameter(cmd, "@Id", recipeType.Id);

                cmd.ExecuteNonQuery();
            }
        }
    }

    public void DeleteRecipeType(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"DELETE FROM RecipeTypes WHERE Id = @Id";
                DbUtils.AddParameter(cmd, "@Id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}
