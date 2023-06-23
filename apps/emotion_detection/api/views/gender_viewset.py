from rest_framework import status, viewsets
from rest_framework.response import Response

from rest_framework.authtoken.models import Token

from django_filters.rest_framework import DjangoFilterBackend 

from apps.emotion_detection.models import Genders
from apps.emotion_detection.api.serlializer import GendersSerializer 

class GendersViewSet(viewsets.ModelViewSet):
    serializer_class = GendersSerializer  
    queryset = GendersSerializer.Meta.model.objects.all()
    filter_backends = [DjangoFilterBackend] 
    filterset_fields =[ 'user_id' , 'day', 'week', 'month' ]

    def get_queryset(self, pk=None):

        if self.request.GET.get('record') == "1":
            return self.queryset \
            .filter(user_id=pk) \
            .filter(day=self.request.GET.get('day')) \
            .filter(month=self.request.GET.get('month')) \
            .filter(year=self.request.GET.get('year'))
        
        if self.request.GET.get('record') == "2":
            return self.queryset \
            .filter(user_id=pk) \
            .filter(week=self.request.GET.get('week')) \
            .filter(year=self.request.GET.get('year'))
        
        if self.request.GET.get('record') == "3":
            return self.queryset \
            .filter(user_id=pk) \
            .filter(month=self.request.GET.get('month')) \
            .filter(year=self.request.GET.get('year'))

        return self.queryset \
        .filter(user_id=pk) \
        .filter(year=self.request.GET.get('year'))
  
    
    def list(self, request):
        try:

            token =  request.GET.get('token')
            token = Token.objects.filter( key = token).first()

            if token:
                expretions_serializer = self.get_serializer(self.get_queryset(token.user.id), many = True)
                return Response(expretions_serializer.data, status = status.HTTP_200_OK)

            return Response({'error': 'No se ha encontrado un usuario con estas credenciales.'}, status = status.HTTP_400_BAD_REQUEST)

        except:
            return Response({'error': 'No se ha encontrado token.'}, status = status.HTTP_409_BAD_REQUEST)
    
    def update(self, request, pk=None):
        return Response({'error': 'No se puden modificar los registros'}, status = status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        try:
            
            # verifies that there is an active session with this token
            token =  request.GET.get('token')
            token = Token.objects.filter( key = token).first()

            if token:
                # send information to serializer
                serializer = self.serializer_class(data = request.data)

                if serializer.is_valid():
                    serializer.save()
                    return Response({'message': 'Registro creado correctamente'}, status = status.HTTP_201_CREATED)
                return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
            
            return Response({'error': 'No se ha encontrado un usuario con estas credenciales.'}, status = status.HTTP_400_BAD_REQUEST)

        except:
            return Response({'error': 'No se ha encontrado token.'}, status = status.HTTP_409_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        detections = self.get_queryset().filter(id = pk).first() #get instance

        if detections:
            detections.delete()
            return Response({'message': 'Registro eliminado correctamente'}, status = status.HTTP_200_OK)
        return Response({'error': 'No existe un registro con estos datos'}, status = status.HTTP_400_BAD_REQUEST)
        
    
    
