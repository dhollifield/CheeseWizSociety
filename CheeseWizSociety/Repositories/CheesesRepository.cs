using CheeseWizSociety.Models;
using CheeseWizSociety.Utils;

namespace CheeseWizSociety.Repositories;

public class CheesesRepository : BaseRepository, ICheesesRepository
{
    public CheesesRepository(IConfiguration configuration) : base(configuration) { }

    public List<Cheeses> GetAllCheeses()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                          SELECT Id
                                ,CheeseName
                                ,ImageUrl
                                ,Description
                            FROM Cheeses";

                var reader = cmd.ExecuteReader();

                var cheeses = new List<Cheeses>();

                while (reader.Read())
                {
                    var cheese = new Cheeses()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        CheeseName = DbUtils.GetString(reader, "CheeseName"),
                        ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                        Description = DbUtils.GetString(reader, "Description")
                    };

                    cheeses.Add(cheese);
                }
                conn.Close();
                return cheeses;

            }
        }
    }

    public Cheeses GetCheeseById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                          SELECT Id
                                ,CheeseName
                                ,ImageUrl
                                ,Description
                            FROM Cheeses
                           WHERE Id = @id";

                cmd.Parameters.AddWithValue("@id", id);
                var reader = cmd.ExecuteReader();
                Cheeses cheese = null;

                while (reader.Read())
                {
                    cheese = new Cheeses()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        CheeseName = DbUtils.GetString(reader, "CheeseName"),
                        ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                        Description = DbUtils.GetString(reader, "Description")
                    };
                }
                conn.Close();
                return cheese;
            }
        }
    }

    public void AddCheese(Cheeses cheese)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                     INSERT INTO Cheeses
                                (CheeseName
                                ,ImageUrl
                                ,Description)
                         OUTPUT INSERTED.Id
                         VALUES (@CheeseName
                                ,@ImageUrl
                                ,@Description)";

                cmd.Parameters.AddWithValue("@CheeseName", cheese.CheeseName);
                cmd.Parameters.AddWithValue("@ImageUrl", cheese.ImageUrl);
                cmd.Parameters.AddWithValue("@Description", cheese.Description);

                cheese.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void UpdateCheese(Cheeses cheese)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                          UPDATE Cheeses
                             SET CheeseName = @CheeseName
                                ,ImageUrl = @ImageUrl
                                ,Description = @Description
                           WHERE Id = @Id";

                DbUtils.AddParameter(cmd, "@Id", cheese.Id);
                DbUtils.AddParameter(cmd, "@CheeseName", cheese.CheeseName);
                DbUtils.AddParameter(cmd, "ImageUrl", cheese.ImageUrl);
                DbUtils.AddParameter(cmd, "Description", cheese.Description);

                cmd.ExecuteNonQuery();
            }
        }
    }

    public void DeleteCheese(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                     DELETE FROM Cheeses
                           WHERE Id = @Id";

                DbUtils.AddParameter(cmd, "@Id", id);

                cmd.ExecuteNonQuery();
            }
        }
    }
}
