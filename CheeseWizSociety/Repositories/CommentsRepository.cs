using CheeseWizSociety.Models;
using CheeseWizSociety.Utils;

namespace CheeseWizSociety.Repositories;

public class CommentsRepository : BaseRepository, ICommentsRepository
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
                        UserId = DbUtils.GetInt(reader, "UserId"),
                        PostId = DbUtils.GetInt(reader, "PostId"),
                        Comment = DbUtils.GetString(reader, "Comment")
                    });
                }
                reader.Close();
                return comments;
            }
        }
    }

    public Comments GetCommentById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                            SELECT Id AS CommentId
                                  ,UserId
                                  ,PostId
                                  ,Comment
                              FROM Comments
                             WHERE Id = @id";

                cmd.Parameters.AddWithValue("id", id);
                var reader = cmd.ExecuteReader();
                Comments comment = null;

                while (reader.Read())
                {
                    comment = new Comments()
                    {
                        Id = DbUtils.GetInt(reader, "CommentId"),
                        UserId = DbUtils.GetInt(reader, "UserId"),
                        PostId = DbUtils.GetInt(reader, "PostId"),
                        Comment = DbUtils.GetString(reader, "Comment")
                    };
                }
                conn.Close();
                return comment;
            }
        }
    }

    public void AddComment(Comments comment)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                       INSERT INTO Comments
		                           (UserId
			                       ,PostId
			                       ,Comment)
                            OUTPUT INSERTED.Id
                            VALUES (@UserId
			                       ,@PostId
			                       ,@Comment)";

                cmd.Parameters.AddWithValue("@UserId", comment.UserId);
                cmd.Parameters.AddWithValue("@PostId", comment.PostId);
                cmd.Parameters.AddWithValue("@Comment", comment.Comment);

                comment.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void UpdateComment(Comments comment)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                            UPDATE Comments
                               SET UserId = @UserId
                                   ,PostId = @PostId
                                   ,Comment = @Comment
                             WHERE Id = @Id";

                DbUtils.AddParameter(cmd, "@Id", comment.Id);
                DbUtils.AddParameter(cmd, "UserId", comment.UserId);
                DbUtils.AddParameter(cmd, "PostId", comment.PostId);
                DbUtils.AddParameter(cmd, "Comment", comment.Comment);

                cmd.ExecuteNonQuery();
            }
        }
    }

    public void DeleteComment(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                       DELETE FROM Comments
                             WHERE Id = @Id";

                DbUtils.AddParameter(cmd, "@Id", id);

                cmd.ExecuteNonQuery();
            }
        }
    }
}
