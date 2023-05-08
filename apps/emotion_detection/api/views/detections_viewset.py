from rest_framework import generics, status, viewsets
from rest_framework.response import Response

from apps.emotion_detection.models import Emotions
from apps.emotion_detection.api.serlializer import DetectionsSerializer 

class DetectionsViewSet(viewsets.ModelViewSet):
    serializer_class = DetectionsSerializer
    queryset = DetectionsSerializer.Meta.model.objects.all()

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.all()
        return self.get_serializer().Meta.model.objects.filter(id = pk)
    
    def list(self, request):
        product_serializer = self.get_serializer(self.get_queryset(), many = True)
        return Response(product_serializer.data, status = status.HTTP_200_OK)
    
    def update(self, request, pk=None):
        print(request.data)
        return Response({'error': 'No se puden modificar los registros'}, status = status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        # send information to serializer
        serializer = self.serializer_class(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registro creado correctamente'}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        detections = self.get_queryset().filter(id = pk).first() #get instance

        if detections:
            detections.delete()
            return Response({'message': 'Registro eliminado correctamente'}, status = status.HTTP_200_OK)
        return Response({'error': 'No existe un registro con estos datos'}, status = status.HTTP_400_BAD_REQUEST)
        
    
    
