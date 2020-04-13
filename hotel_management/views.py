from django.shortcuts import render
from django.views.generic import View


class FrontendView(View):
    """ render the   fronted  app   with djanngo.  """

    def get(self, request, *args, **kwargs):
        return render(request, 'build/index.html')
