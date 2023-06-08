using CheeseWizSociety.Models;
using CheeseWizSociety.Utils;

namespace CheeseWizSociety.Repositories;

public class UsersRepository : BaseRepository, IUsersRepository
{
    public UsersRepository(IConfiguration configuration) : base(configuration) { }

    public List<Users> GetAllUsers()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                           SELECT Id
                                  ,FirebaseUid
                                  ,UserName
                                  ,Email
                                  ,ImageUrl
                                  ,Type
                             FROM Users";

                var reader = cmd.ExecuteReader();

                var users = new List<Users>();

                while (reader.Read())
                {
                    var user = new Users()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        FirebaseUid = DbUtils.GetNullableString(reader, "FirebaseUid"),
                        UserName = DbUtils.GetString(reader, "UserName"),
                        Email = DbUtils.GetString(reader, "Email"),
                        ImageUrl = DbUtils.GetNullableString(reader, "ImageUrl"),
                        Type = DbUtils.GetString(reader, "Type")
                    };

                    users.Add(user);
                }
                conn.Close();
                return users;
            }
        }
    }

    public Users GetUserById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                           SELECT Id
                                  ,FirebaseUid
                                  ,UserName
                                  ,Email
                                  ,ImageUrl
                                  ,Type
                             FROM Users
                            WHERE Id = @id";

                cmd.Parameters.AddWithValue("id", id);
                var reader = cmd.ExecuteReader();
                Users user = null;

                while (reader.Read())
                {
                    user = new Users()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        FirebaseUid = DbUtils.GetNullableString(reader, "FirebaseUid"),
                        UserName = DbUtils.GetString(reader, "UserName"),
                        Email = DbUtils.GetString(reader, "Email"),
                        ImageUrl = DbUtils.GetNullableString(reader, "ImageUrl"),
                        Type = DbUtils.GetString(reader, "Type")
                    };
                }
                conn.Close();
                return user;
            }
        }
    }

    public Users GetUserByEmail(string Email)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                           SELECT Id
                                  ,FirebaseUid
                                  ,UserName
                                  ,Email
                                  ,ImageUrl
                                  ,Type
                             FROM Users
                            WHERE Email = @Email";

                cmd.Parameters.AddWithValue("Email", Email);
                var reader = cmd.ExecuteReader();
                Users user = null;

                while (reader.Read())
                {
                    user = new Users()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        FirebaseUid = DbUtils.GetNullableString(reader, "FirebaseUid"),
                        UserName = DbUtils.GetString(reader, "UserName"),
                        Email = DbUtils.GetString(reader, "Email"),
                        ImageUrl = DbUtils.GetNullableString(reader, "ImageUrl"),
                        Type = DbUtils.GetString(reader, "Type")
                    };
                }
                reader.Close();
                return user;
            }
        }
    }

    public Users GetUserByFirebaseUid(string FirebaseUid)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                           SELECT Id
                                  ,FirebaseUid
                                  ,UserName
                                  ,Email
                                  ,ImageUrl
                                  ,Type
                             FROM Users
                            WHERE FirebaseUid = @FirebaseUid";

                cmd.Parameters.AddWithValue("FirebaseUid", FirebaseUid);
                var reader = cmd.ExecuteReader();
                Users user = null;

                while (reader.Read())
                {
                    user = new Users()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        FirebaseUid = DbUtils.GetNullableString(reader, "FirebaseUid"),
                        UserName = DbUtils.GetString(reader, "UserName"),
                        Email = DbUtils.GetString(reader, "Email"),
                        ImageUrl = DbUtils.GetNullableString(reader, "ImageUrl"),
                        Type = DbUtils.GetString(reader, "Type")
                    };
                }
                reader.Close();
                return user;
            }
        }
    }

    public Users GetUserByIdWithFavCheeses(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                        SELECT u.Id AS UserId
	                          ,u.UserName
	                          ,u.Email
	                          ,u.ImageUrl

	                          ,c.Id AS CheeseId
                              ,c.CheeseName
	                          ,c.ImageUrl AS CheeseImg
	                          ,c.[Description]
                            FROM users u
                            JOIN favoriteCheeses fc
                            ON u.Id = fc.UserId
                            JOIN cheeses c
                            ON c.Id = fc.CheeseId
                            WHERE u.Id = @Id";

                cmd.Parameters.AddWithValue("@id", id);

                var reader = cmd.ExecuteReader();

                Users user = null;

                while (reader.Read())
                {
                    if (user == null)
                    {
                        user = new Users
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Cheese = new List<Cheeses>()
                        };
                    }

                    if (DbUtils.IsNotDbNull(reader, "CheeseId"))
                    {
                        user.Cheese.Add(new Cheeses()
                        {
                            Id = DbUtils.GetInt(reader, "CheeseId"),
                            CheeseName = DbUtils.GetString(reader, "CheeseName"),
                            ImageUrl = DbUtils.GetString(reader, "CheeseImg"),
                            Description = DbUtils.GetString(reader, "Description")
                        });
                    }
                }
                reader.Close();
                return user;
            }
        }
    }

    public void AddUser(Users user)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                         INSERT INTO Users
                                    (FirebaseUid
                                    ,UserName
                                    ,Email
                                    ,ImageUrl
                                    ,Type)
                             OUTPUT INSERTED.Id
                              VALUES (@FirebaseUid
                                    ,@UserName
                                    ,@Email
                                    ,@ImageUrl
                                    ,@Type)";

                cmd.Parameters.AddWithValue("@FirebaseUid", user.FirebaseUid);
                cmd.Parameters.AddWithValue("@UserName", user.UserName);
                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@ImageUrl", user.ImageUrl);
                cmd.Parameters.AddWithValue("@Type", user.Type);

                user.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void UpdateUser(Users user)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                              UPDATE Users
                                 SET FirebaseUid = @FirebaseUid
                                    ,UserName = @UserName
                                    ,Email = @Email
                                    ,ImageUrl = @ImageUrl
                                    ,Type = @Type
                               WHERE Id = @Id";

                DbUtils.AddParameter(cmd, "@Id", user.Id);
                DbUtils.AddParameter(cmd, "@FirebaseUid", user.FirebaseUid);
                DbUtils.AddParameter(cmd, "@UserName", user.UserName);
                DbUtils.AddParameter(cmd, "@Email", user.Email);
                DbUtils.AddParameter(cmd, "@ImageUrl", user.ImageUrl);
                DbUtils.AddParameter(cmd, "@Type", user.Type);

                cmd.ExecuteNonQuery();
            }
        }
    }

    public void DeleteUser(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                         DELETE FROM Users
                               WHERE Id = @Id";

                DbUtils.AddParameter(cmd, "@Id", id);

                cmd.ExecuteNonQuery();
            }
        }
    }
}
