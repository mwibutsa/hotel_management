from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_extensions.routers import NestedRouterMixin
from django.urls import path


class NestedRouter(NestedRouterMixin, DefaultRouter):
    """Create a custom nested router. """
    pass


app_name = 'client'

router = NestedRouter()

client_router = router.register(
    'clients', views.ClientListView, basename='clients')

expenses_router = client_router.register(
    'expenses', views.ClientExpensesListView,
    basename='client-expenses',
    parents_query_lookups=['client'])


urlpatterns = [
    path('expenses/<int:pk>', views.ClientExpensesDetailView.as_view(),
         name='expense-detail'),
    path('clients/<int:pk>',
         views.ClientDetailView.as_view(), name='client-detail')
]
urlpatterns += router.urls
