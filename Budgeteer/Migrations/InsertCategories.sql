USE [Budgeteer]
GO
SET IDENTITY_INSERT [dbo].[Categories] ON 

INSERT [dbo].[Categories] ([Id], [IsActive], [Name], [Type]) VALUES (1, 1, N'Automobile', 1)
INSERT [dbo].[Categories] ([Id], [IsActive], [Name], [Type]) VALUES (2, 1, N'Food', 1)
INSERT [dbo].[Categories] ([Id], [IsActive], [Name], [Type]) VALUES (3, 1, N'Bonus', 0)
INSERT [dbo].[Categories] ([Id], [IsActive], [Name], [Type]) VALUES (4, 1, N'Salary', 0)
SET IDENTITY_INSERT [dbo].[Categories] OFF
