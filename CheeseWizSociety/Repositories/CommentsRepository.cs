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
                cmd.CommandText = @"
                            SELECT c.id AS CommentId
                                  ,c.Comment
                                  ,c.UserId
                                  ,c.PostId
                                  ,u.UserName
                              FROM Comments c
                              JOIN Users u ON c.UserId = u.id";

                var reader = cmd.ExecuteReader();

                var comments = new List<Comments>();

                while (reader.Read())
                {
                    comments.Add(new Comments()
                    {
                        Id = DbUtils.GetInt(reader, "CommentId"),
                        Comment = DbUtils.GetString(reader, "Comment"),
                        UserId = DbUtils.GetInt(reader, "UserId"),
                        PostId = DbUtils.GetInt(reader, "PostId"),
                        User = new Users()
                        {
                            UserName = DbUtils.GetString(reader, "UserName")
                        } 
                    });
                }
                reader.Close();
                return comments;
            }
        }
    }

    public Comments GetCommentByIdWithCommenters(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                        SELECT c.id AS CommentId
		                        ,c.PostId
	                            ,c.Comment

	                            ,u.id AS CommenterId
	                            ,u.UserName
                            FROM Comments c
                       LEFT JOIN Users u 
                              ON c.UserId = u.id
                           WHERE c.id = @id";

                cmd.Parameters.AddWithValue("id", id);
                var reader = cmd.ExecuteReader();
                Comments comment = null;

                while (reader.Read())
                {
                    comment = new Comments()
                    {
                        Id = DbUtils.GetInt(reader, "CommentId"),
                        PostId = DbUtils.GetInt(reader, "PostId"),
                        Comment = DbUtils.GetString(reader, "Comment"),
                        User = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "CommenterId"),
                            UserName = DbUtils.GetString(reader, "UserName")
                        }
                    };
                }
                conn.Close();
                return comment;
            }
        }
    }

    public List<Comments> GetCommentsByPostId(int PostId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                            SELECT c.id AS CommentId
	                                 ,c.Comment
                                     ,c.UserId AS Commenter
		                             ,c.PostId

	                                 ,u.id AS CommenterId
	                                 ,u.UserName
                                 FROM Comments c
                            LEFT JOIN Users u 
                                   ON c.UserId = u.id
                            LEFT JOIN Posts p
	                               ON c.PostId = p.id
	                            WHERE c.PostId = @PostId";

                cmd.Parameters.AddWithValue("@PostId", PostId);

                var reader = cmd.ExecuteReader();

                var comments = new List<Comments>();

                Comments comment = null;

                while (reader.Read())
                {
                    if (comment == null || comment.Id != DbUtils.GetInt(reader, "CommentId")) 
                    {
                        if (comment != null)
                        {
                            comments.Add(comment);
                        }

                        comment = new Comments()
                        {
                            Id = DbUtils.GetInt(reader, "CommentId"),
                            Comment = DbUtils.GetString(reader, "Comment"),
                            UserId = DbUtils.GetInt(reader, "Commenter"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            User = new Users()
                            {
                                Id = DbUtils.GetInt(reader, "CommenterId"),
                                UserName = DbUtils.GetString(reader, "UserName")
                            }
                        };
                    } 
                }

                if (comment != null)
                {
                    comments.Add(comment);
                }

                reader.Close();
                return comments;
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
