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
                        ImageUrl = DbUtils.GetNullableString(reader, "ImageUrl")
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
                        ImageUrl = DbUtils.GetNullableString(reader, "ImageUrl")
                    };
                }
                conn.Close();
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
                                    ,ImageUrl)
                             OUTPUT INSERTED.Id
                              VALUES (@FirebaseUid
                                    ,@UserName
                                    ,@Email
                                    ,@ImageUrl)";

                cmd.Parameters.AddWithValue("@FirebaseUid", user.FirebaseUid);
                cmd.Parameters.AddWithValue("@UserName", user.UserName);
                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@ImageUrl", user.ImageUrl);

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
                               WHERE Id = @Id";

                DbUtils.AddParameter(cmd, "@Id", user.Id);
                DbUtils.AddParameter(cmd, "@FirebaseUid", user.FirebaseUid);
                DbUtils.AddParameter(cmd, "@UserName", user.UserName);
                DbUtils.AddParameter(cmd, "@Email", user.Email);
                DbUtils.AddParameter(cmd, "@ImageUrl", user.ImageUrl);

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
