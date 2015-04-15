from django.contrib import admin
import django.forms


class LocalizedAdmin(admin.ModelAdmin):

    def get_form(self, *args, **kwargs):
        form = super(LocalizedAdmin, self).get_form(*args, **kwargs)
        localize_form(form)
        return form

def localize_form(form):
    '''
    Patch <form> (class) to localize all decimal fields.
    '''
    def forminit(self, *args, **kwargs):
        super(form, self).__init__(*args, **kwargs)
        for key, field in self.fields.items():
            if isinstance(field, django.forms.DecimalField) or isinstance(field, django.forms.FloatField):
                field.localize = True
                field.widget.is_localized = True
                # set textimput here, as otherwise HTML% type=number field wont commit any data
                # https://www.aeyoun.com/posts/html5-input-number-localization.html
                field.widget = django.forms.TextInput()
    setattr(form, '__init__', forminit)
    
