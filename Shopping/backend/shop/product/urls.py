from django.urls import path
from .views import *



urlpatterns = [
    path('category/', Add_CategoryView.as_view(), name='categories'),
    path('categorylist/',CategoryView.as_view(),name='category_list'),
    path('cat/<str:pk>/',Add_CategoryView.as_view(), name= 'update category'), # to capture our ids)

    # path('cat_update/<str:pk>/', Add_CategoryView.as_view(), name= 'update category'), # to capture our ids
    # path('del_update/<str:pk>/', Add_CategoryView.as_view(), name= 'delete category'), # to capture our ids

    path('subcategory/', Add_SubCategoryView.as_view(), name='subcategory'),
    path('subcat/<str:pk>/',Add_SubCategoryView.as_view(), name= 'update Sub category'), # to capture our ids)
    path('subcategorylist/', SubCategoryView.as_view(), name='subcategory_list'),
    
    path('product/', Add_ProductView.as_view(), name='product'),
    path('item/<str:pk>/',Add_ProductView.as_view(), name= 'update Product'), # to capture our ids)
    path('productlist/',ProductView.as_view(), name='Product_list'),
    # path('email-verify/', VerifyEmail.as_view(), name='email-verify'),
    # path('userlogin/',UserLoginView.as_view(),name='Login'),
    # path('userlist/',UserListView.as_view(),name='users')
    ]