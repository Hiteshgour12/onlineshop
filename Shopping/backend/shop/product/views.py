from django.shortcuts import render
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import permissions, generics, status
from rest_framework.parsers import MultiPartParser, FormParser

class Add_CategoryView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CategoriesSerializers

    def post(self, request):
        user = request.user
        if user.role == 'admin':
            serializer = CategoriesSerializers(data=request.data)
            
            if serializer.is_valid():
                serializer.save(created_by=request.user)
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        # return Response(True)
        else:
            response = {
                # 'success': False,
                # 'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this action'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)

    

    def put(self, request, pk=None, format=None):
        user = request.user
        if user.role == 'admin':
            Cat_update = Categories.objects.get(pk=pk)
            serializer = CategoriesSerializers(instance=Cat_update,data=request.data, partial=True)

            serializer.is_valid(raise_exception=True)

            serializer.save()

            response = Response()

            response.data = {
                'message': 'category Updated Successfully',
                'data': serializer.data
            }

            return response
        else:
            response = {
                # 'success': False,
                # 'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this action'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk, format=None):
        user = request.user
        if user.role == 'admin':

            cat_delete =  Categories.objects.get(pk=pk)

            cat_delete.delete()

            return Response({
                'message': 'Category Deleted Successfully'
            })
        else:
            response = {
                # 'success': False,
                # 'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this action'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)

class CategoryView(generics.GenericAPIView):
    # permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CategoriesSerializers
    def get(self,request):
        category = Categories.objects.all()
        serializer = self.serializer_class(category, many=True)
        response = {
            'success': True,
            'status_code': status.HTTP_200_OK,
            'message': 'Successfully fetched category',
            'category': serializer.data

        }
        return Response(response, status=status.HTTP_200_OK)

    


class Add_SubCategoryView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = SubcategorySerializers


    def post(self, request):
        user = request.user
        if user.role == 'admin':
            serializer = SubcategorySerializers(data=request.data,)
            if serializer.is_valid():
                print(serializer.name)
                try:
                # if serializer.name

                    serializer.save()
                except IntegrityError:
                    return Response(" already exists.",status=status.HTTP_406_NOT_ACCEPTABLE,)
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
            # else:
            #     return Response({"status": "Product Already Exists", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                
        # return Response(True)
        else:
            response = {
                # 'success': False,
                # 'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this action'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)

    def put(self, request, pk=None, format=None):
        user = request.user
        if user.role == 'admin':
            Cat_update = SubCategory.objects.get(pk=pk)
            serializer = SubcategorySerializers(instance=Cat_update,data=request.data, partial=True)

            serializer.is_valid(raise_exception=True)

            serializer.save()

            response = Response()

            response.data = {
                'message': 'subcategory Updated Successfully',
                'data': serializer.data
            }

            return response
        else:
            response = {
                # 'success': False,
                # 'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this action'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk, format=None):
        user = request.user
        if user.role == 'admin':

            cat_delete =  SubCategory.objects.get(pk=pk)

            cat_delete.delete()

            return Response({
                'message': 'Sub Category Deleted Successfully'
            })
        else:
            response = {
                # 'success': False,
                # 'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this action'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)



class SubCategoryView(generics.GenericAPIView):
    # permission_classes = (permissions.IsAuthenticated,)
    serializer_class = SubcategorySerializers
    def get(self,request):
        sub_category = SubCategory.objects.all()
        serializer = self.serializer_class(sub_category, many=True)
        response = {
            'success': True,
            'status_code': status.HTTP_200_OK,
            'message': 'Successfully fetched category',
            'category': serializer.data

        }
        return Response(response, status=status.HTTP_200_OK)



class Add_ProductView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProductSerializers

    def post(self, request):
        user = request.user
        if user.role == 'admin':
            serializer = ProductSerializers(data=request.data, )
            if serializer.is_valid():

                serializer.save()
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        # return Response(True)
        else:
            response = {
                # 'success': False,
                # 'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this action'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)

    def put(self, request, pk=None, format=None):
        user = request.user
        if user.role == 'admin':
            Cat_update = Product.objects.get(pk=pk)
            serializer = ProductSerializers(instance=Cat_update,data=request.data, partial=True)

            serializer.is_valid(raise_exception=True)

            serializer.save()

            response = Response()

            response.data = {
                'message': 'subcategory Updated Successfully',
                'data': serializer.data
            }

            return response
        else:
            response = {
                # 'success': False,
                # 'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this action'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk, format=None):
        user = request.user
        if user.role == 'admin':

            item_delete =  Product.objects.get(pk=pk)

            item.delete()

            return Response({
                'message': 'Product Deleted Successfully'
            })
        else:
            response = {
                # 'success': False,
                # 'status_code': status.HTTP_403_FORBIDDEN,
                'message': 'You are not authorized to perform this action'
            }
            return Response(response, status.HTTP_403_FORBIDDEN)


class ProductView(generics.GenericAPIView):
    # permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProductSerializers
    def get(self,request):
        item = Product.objects.all()
        serializer = self.serializer_class(item, many=True)
        response = {
            'success': True,
            'status_code': status.HTTP_200_OK,
            'message': 'Successfully fetched Product',
            'Product': serializer.data

        }
        return Response(response, status=status.HTTP_200_OK)