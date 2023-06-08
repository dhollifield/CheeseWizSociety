using CheeseWizSociety.Repositories;
using Microsoft.Identity.Client.Platforms.Features.DesktopOs.Kerberos;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

namespace CheeseWizSociety
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddTransient<IUsersRepository, UsersRepository>();
            builder.Services.AddTransient<ICheesesRepository, CheesesRepository>();
            builder.Services.AddTransient<IRecipesRepository, RecipesRepository>();
            builder.Services.AddTransient<IRecipeTypesRepository, RecipeTypesRepository>();
            builder.Services.AddTransient<IPostsRepository, PostsRepository>();
            builder.Services.AddTransient<ICommentsRepository, CommentsRepository>();

            //FirebaseApp.Create(new AppOptions()
            //{
            //    Credential = GoogleCredential.FromFile(builder.Configuration["fbCredPath"]),
            //});

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();

                app.UseCors(options =>
                {
                    options.AllowAnyOrigin();
                    options.AllowAnyMethod();
                    options.AllowAnyHeader();
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}