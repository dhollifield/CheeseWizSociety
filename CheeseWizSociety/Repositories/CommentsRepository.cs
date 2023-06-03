using CheeseWizSociety.Models;
using CheeseWizSociety.Utils;

namespace CheeseWizSociety.Repositories;

public class CommentsRepository : BaseRepository
{
    public CommentsRepository(IConfiguration configuration) : base(configuration) { }

    public List<Comments> GetAllComments()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "SELECT * FROM Comments";

                var reader = cmd.ExecuteReader();

                var comments = new List<Comments>();    

                while (reader.Read())
                {
                    comments.Add(new Comments()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        Comment = DbUtils.GetString(reader, "Comment")
                    });
                }
                reader.Close();
                return comments;
            }
        }
    }
}
