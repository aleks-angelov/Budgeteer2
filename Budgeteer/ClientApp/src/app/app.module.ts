import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { HomeComponent } from './modules/home/home.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { UserGroupsModule } from './modules/user_groups/user-groups.module';
import { AuthenticationComponent } from './modules/users/components/authentication.component';
import { UsersModule } from './modules/users/users.module';
import { httpInterceptorProviders } from './infrastructure/interceptors/interceptor-providers';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		InfrastructureModule,
		CategoriesModule,
		TransactionsModule,
		UsersModule,
		UserGroupsModule,
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
	],
	declarations: [
		AppComponent,
		AuthenticationComponent,
		HomeComponent,
		NavbarComponent
	],
	providers: [httpInterceptorProviders],
	bootstrap: [AppComponent]
})
export class AppModule { }
