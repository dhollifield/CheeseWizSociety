using CheeseWizSociety.Models;
using CheeseWizSociety.Utils;
using Microsoft.Extensions.Hosting;

namespace CheeseWizSociety.Repositories;

public class PostsRepository : BaseRepository, IPostsRepository
{
    public PostsRepository(IConfiguration configuration) : base(configuration) { }

    public List<Posts> GetAllPosts()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                          SELECT p.Id AS PostId
	                            ,p.Title
	                            ,p.ImageUrl
	                            ,p.Caption
	                            ,p.DateCreated
                                ,p.UserId as PostUserId

                                ,u.Id AS UserId
	                            ,u.UserName
                            FROM Posts p
                            JOIN Users u
                              ON p.UserId = u.Id
                        ORDER BY p.DateCreated";

                var reader = cmd.ExecuteReader();

                var posts = new List<Posts>();

                while (reader.Read())
                {
                    posts.Add(new Posts()
                    {
                        Id = DbUtils.GetInt(reader, "PostId"),
                        Title = DbUtils.GetString(reader, "Title"),
                        ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                        Caption = DbUtils.GetString(reader, "Caption"),
                        DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                        User = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            UserName = DbUtils.GetString(reader, "UserName")
                        }
                    });
                }
                reader.Close();
                return posts;
            }
        }
    }

    public List<Posts> GetAllPostsWithComments()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT p.Id AS PostId
	                            ,p.Title
	                            ,p.ImageUrl
	                            ,p.Caption
	                            ,p.DateCreated
								,p.UserId AS PostUserId

	                            ,u.UserName AS PostUserName

								,c.Id AS CommentId
								,c.Comment
								,c.UserId AS CommentUserId
                                ,uc.UserName AS CommentUserName
                            FROM Posts p
                       LEFT JOIN Users u ON p.UserId = u.Id
					   LEFT JOIN Comments c ON c.PostId = p.Id
                       LEFT JOIN Users uc ON c.UserId = uc.Id
						ORDER BY p.DateCreated";

                var reader = cmd.ExecuteReader();

                var posts = new List<Posts>();
                while (reader.Read())
                {
                    var postId = DbUtils.GetInt(reader, "PostId");

                    var existingPost = posts.FirstOrDefault(p => p.Id == postId);

                    if (existingPost == null)
                    {
                        existingPost = new Posts()
                        {
                            Id = postId,
                            Title = DbUtils.GetString(reader, "Title"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Caption = DbUtils.GetString(reader, "Caption"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            UserId = DbUtils.GetInt(reader, "PostUserId"),
                            User = new Users()
                            {
                                Id = DbUtils.GetInt(reader, "PostUserId"),
                                UserName = DbUtils.GetString(reader, "PostUserName"),
                            },
                            Comments = new List<Comments>()
                        };

                        posts.Add(existingPost);
                    }

                    if (DbUtils.IsNotDbNull(reader, "CommentId"))
                    {
                        existingPost.Comments.Add(new Comments()
                        {
                            Id = DbUtils.GetInt(reader, "CommentId"),
                            Comment = DbUtils.GetString(reader, "Comment"),
                            PostId = postId,
                            UserId = DbUtils.GetInt(reader, "CommentUserId"),
                            User = new Users()
                            {
                                UserName = DbUtils.GetString(reader, "CommentUserName")
                            }
                        });
                    }
                }

                reader.Close();
                return posts;
            }
        }
    }

    public Posts GetPostById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                          SELECT p.Id AS PostId
	                            ,p.Title
	                            ,p.ImageUrl
	                            ,p.Caption
	                            ,p.DateCreated
                                ,p.UserId as PostUserId

                                ,u.Id AS UserId
	                            ,u.UserName
                            FROM Posts p
                            JOIN Users u
                              ON p.UserId = u.Id
                           WHERE p.Id = @id
                        ORDER BY p.DateCreated";

                DbUtils.AddParameter(cmd, "id", id);

                var reader = cmd.ExecuteReader();

                Posts post = null;

                if (reader.Read())
                {
                    post = new Posts()
                    {
                        Id = id,
                        Title = DbUtils.GetString(reader, "Title"),
                        ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                        Caption = DbUtils.GetString(reader, "Caption"),
                        DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                        User = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            UserName = DbUtils.GetString(reader, "UserName")
                        }
                    };

                }
                reader.Close();

                return post;
            }
        }
    }

    public List<Posts> GetPostByIdWithComments(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT p.Id AS PostId
	                            ,p.Title
	                            ,p.ImageUrl
	                            ,p.Caption
	                            ,p.DateCreated
								,p.UserId AS PostUserId

	                            ,u.UserName

								,c.Id AS CommentId
								,c.Comment
								,c.UserId AS CommentUserId
                            FROM Posts p
                       LEFT JOIN Users u ON p.UserId = u.Id
					   LEFT JOIN Comments c ON c.PostId = p.Id
                           WHERE p.Id = @id
						ORDER BY p.DateCreated";

                DbUtils.AddParameter(cmd, "@id", id);

                var reader = cmd.ExecuteReader();

                var posts = new List<Posts>();
                while (reader.Read())
                {
                    var postId = DbUtils.GetInt(reader, "PostId");

                    var existingPost = posts.FirstOrDefault(p => p.Id == postId);
                    if (existingPost == null)
                    {
                        existingPost = new Posts()
                        {
                            Id = postId,
                            Title = DbUtils.GetString(reader, "Title"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Caption = DbUtils.GetString(reader, "Caption"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            UserId = DbUtils.GetInt(reader, "PostUserId"),
                            User = new Users()
                            {
                                Id = DbUtils.GetInt(reader, "PostUserId"),
                                UserName = DbUtils.GetString(reader, "UserName"),
                            },
                            Comments = new List<Comments>()
                        };

                        posts.Add(existingPost);
                    }

                    if (DbUtils.IsNotDbNull(reader, "CommentId"))
                    {
                        existingPost.Comments.Add(new Comments()
                        {
                            Id = DbUtils.GetInt(reader, "CommentId"),
                            Comment = DbUtils.GetString(reader, "Comment"),
                            PostId = postId,
                            UserId = DbUtils.GetInt(reader, "CommentUserId")
                        });
                    }
                }

                reader.Close();

                return posts;
            }
        }
    }

    public List<Posts> Search(string criterion, bool sortDescending)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                var sql =
                    cmd.CommandText = @"
                          SELECT p.Id AS PostId
	                            ,p.Title
	                            ,p.ImageUrl
	                            ,p.Caption
	                            ,p.DateCreated
                                ,p.UserId as PostUserId

                                ,u.Id AS UserId
	                            ,u.UserName
                            FROM Posts p
                            JOIN Users u
                              ON p.UserId = u.Id
                           WHERE p.Title LIKE @Criterion
                              OR p.Caption LIKE @Criterion";

                if (sortDescending)
                {
                    sql += " ORDER BY p.DateCreated DESC";
                }
                else
                {
                    sql += " ORDER BY p.DateCreated";
                }

                cmd.CommandText = sql;
                DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                var reader = cmd.ExecuteReader();

                var posts = new List<Posts>();
                while (reader.Read())
                {
                    posts.Add(new Posts()
                    {
                        Id = DbUtils.GetInt(reader, "PostId"),
                        Title = DbUtils.GetString(reader, "Title"),
                        ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                        Caption = DbUtils.GetString(reader, "Caption"),
                        DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                        User = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            UserName = DbUtils.GetString(reader, "UserName")
                        }
                    });
                }

                reader.Close();

                return posts;
            }
        }
    }

    public List<Posts> Hottest(bool sortDescending)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                var sql =
                    cmd.CommandText = @"
                          SELECT p.Id AS PostId
	                            ,p.Title
	                            ,p.ImageUrl
	                            ,p.Caption
	                            ,p.DateCreated
                                ,p.UserId as PostUserId

                                ,u.Id AS UserId
	                            ,u.UserName
                            FROM Posts p
                            JOIN Users u
                              ON p.UserId = u.Id
                           WHERE p.DateCreated > (SELECT DATEADD(WEEK, -1, GETDATE()))";

                if (sortDescending)
                {
                    sql += " ORDER BY p.DateCreated DESC";
                }
                else
                {
                    sql += " ORDER BY p.DateCreated";
                }

                cmd.CommandText = sql;
                var reader = cmd.ExecuteReader();

                var posts = new List<Posts>();
                while (reader.Read())
                {
                    posts.Add(new Posts()
                    {
                        Id = DbUtils.GetInt(reader, "PostId"),
                        Title = DbUtils.GetString(reader, "Title"),
                        ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                        Caption = DbUtils.GetString(reader, "Caption"),
                        DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                        User = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            UserName = DbUtils.GetString(reader, "UserName")
                        }
                    });
                }

                reader.Close();

                return posts;
            }
        }
    }

    public void AddPost(Posts post)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                     INSERT INTO Posts
                                (Title
                                ,ImageUrl
                                ,Caption
                                ,DateCreated
                                ,UserId)
                          OUTPUT INSERTED.Id
                          VALUES (@Title
                                ,@ImageUrl
                                ,@Caption
                                ,@DateCreated
                                ,@UserId)";

                DbUtils.AddParameter(cmd, "@Title", post.Title);
                DbUtils.AddParameter(cmd, "@ImageUrl", post.ImageUrl);
                DbUtils.AddParameter(cmd, "@Caption", post.Caption);
                DbUtils.AddParameter(cmd, "@DateCreated", post.DateCreated);
                DbUtils.AddParameter(cmd, "@UserId", post.UserId);

                post.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void UpdatePost(Posts post)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                          UPDATE Posts
                             SET Title = @Title,
                                 ImageUrl = @ImageUrl,
                                 Caption = @Caption,
                                 DateCreated = @DateCreated,
                                 UserId = @UserId
                           WHERE Id = @id";

                DbUtils.AddParameter(cmd, "@Title", post.Title);
                DbUtils.AddParameter(cmd, "@ImageUrl", post.ImageUrl);
                DbUtils.AddParameter(cmd, "@Caption", post.Caption);
                DbUtils.AddParameter(cmd, "@DateCreated", post.DateCreated);
                DbUtils.AddParameter(cmd, "@UserId", post.UserId);

                cmd.ExecuteNonQuery();
            }
        }
    }

    public void DeletePost(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "DELETE FROM Posts WHERE Id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}
