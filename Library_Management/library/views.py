from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Book, Borrower
from .serializers import BookSerializer, BorrowerSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=True, methods=['post'])
    def borrow(self, request, pk=None):
        book = self.get_object()
        if book.is_available:
            book.is_available = False
            book.save()
            return Response({'status': 'book borrowed'})
        else:
            return Response({'status': 'book not available'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def return_book(self, request, pk=None):
        book = self.get_object()
        if not book.is_available:
            book.is_available = True
            book.save()
            return Response({'status': 'book returned'})
        else:
            return Response({'status': 'book was not borrowed'}, status=status.HTTP_400_BAD_REQUEST)

class BorrowerViewSet(viewsets.ModelViewSet):
    queryset = Borrower.objects.all()
    serializer_class = BorrowerSerializer