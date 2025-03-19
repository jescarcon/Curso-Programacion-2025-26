from django.http import JsonResponse

def api_home(request):
    return JsonResponse({"message": "Saludos desde Django de Gonzalo"})