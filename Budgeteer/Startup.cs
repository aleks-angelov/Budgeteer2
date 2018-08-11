using System.Text;

using Budgeteer.Middleware;
using Budgeteer.Modules;
using Budgeteer.Modules.Categories;
using Budgeteer.Modules.Transactions;
using Budgeteer.Modules.UserGroups;
using Budgeteer.Modules.Users;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

using Newtonsoft.Json;

using Swashbuckle.AspNetCore.Swagger;

namespace Budgeteer
{
	public class Startup
	{
		public IConfiguration Configuration { get; }

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(options =>
				{
					options.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuer = true,
						ValidateAudience = true,
						ValidateLifetime = true,
						ValidateIssuerSigningKey = true,
						ValidIssuer = "budgeteer.com",
						ValidAudience = "budgeteer.com",
						IssuerSigningKey = new SymmetricSecurityKey(
							Encoding.UTF8.GetBytes(Configuration["SecurityKey"]))
					};
				});

			services.AddCors();

			services.AddHsts(options =>
			{
				options.Preload = true;
				options.IncludeSubDomains = true;
			});

			services.AddHttpsRedirection(options =>
			{
				options.RedirectStatusCode = StatusCodes.Status301MovedPermanently;
			});

			services.AddMvc()
				.SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
				.AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

			services.AddDbContextPool<EntityContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Budgeteer")));

			services.AddScoped<CategoriesRepository>();
			services.AddScoped<TransactionsRepository>();
			services.AddScoped<UserGroupsRepository>();
			services.AddScoped<UsersRepository>();

			services.AddSwaggerGen(options =>
			{
				options.SwaggerDoc("v1", new Info
				{
					Version = "v1",
					Title = "Budgeteer API",
					Contact = new Contact
					{
						Name = "Aleks Angelov",
						Email = "aleks_angelov@mail.com"
					}
				});
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseCors(builder => builder.WithOrigins("http://localhost:54321")
							  .AllowAnyHeader()
							  .AllowAnyMethod());

				app.UseDeveloperExceptionPage();
				app.UseDatabaseErrorPage();
			}
			else
			{
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseMiddleware<RedirectionMiddleware>();

			app.UseFileServer();

			app.UseAuthentication();

			app.UseSwagger();
			app.UseSwaggerUI(options =>
			{
				options.SwaggerEndpoint("/swagger/v1/swagger.json", "Budgeteer API v1");
			});

			app.UseMvc();
		}
	}
}
