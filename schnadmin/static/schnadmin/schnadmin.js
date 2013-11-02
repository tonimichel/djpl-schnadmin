var schnadmin = {}

schnadmin.ui = {}


schnadmin.ui.make_dropdown = function(selector, schema) {
    $(selector).html(schnadmin.ui.dropdown(schema).render())
}


schnadmin.ui.message = function(msg) {

    var messagelist = $('.messagelist')
    
    if (messagelist.length == 0) {
        messagelist = $('<ul class="messagelist"></ul>')
        $('.breadcrumbs').after(messagelist)
    }    
    messagelist.show()    
    messagelist.append('<li>' + msg + '</li>')
    schnadmin.ui.message_fadeout()
}

schnadmin.ui.message_fadeout = function() {
    $('ul.messagelist').fadeOut(10000, function() {
        $(this).remove()
    })
    
}



/**
*   A fancy schnadmin dropdown menu
*/
schnadmin.ui.dropdown = function(schema) {

    var self = {}
    self.schema = schema
    self.templates = {
        link: _.template('<a href=""><%=name%></a>')
    }
    self.dom = {
        main: $('\
            <div class="schnadmin-dropdown">\
                <div class="schnadmin-dropdown-label"></div>\
                <div class="schnadmin-dropdown-links"></div>\
            </div>\
        ')
    }
    self.dom.label = self.dom.main.find('.schnadmin-dropdown-label')
    self.dom.links = self.dom.main.find('.schnadmin-dropdown-links')

    self.render = function() {
        self.dom.main.disableSelection()
        self.dom.label.html(self.schema.label)
        if (self.schema.extra_classes)
            self.dom.label.addClass(self.schema.exra_classes)

        self.dom.label.click(function() {
            if (self.dom.links.css('display') === 'none') {
                $('.schnadmin-dropdown-links').hide()
                self.dom.links.show()            
            } else {
                self.dom.links.hide()
            }
            return false
        })
        
        
        self.dom.links.empty()        
        $.each(self.schema.links, function(i, linkconf) {
            var link = $(self.templates.link({'name': linkconf.name}))
            if (linkconf.click != undefined) {
                link.click(linkconf.click())
            } else {
                link.attr('href', linkconf.href)
            }
            
            if (linkconf.extra_classes = undefined)
                link.attr('class', linkconf.extra_classes)
            self.dom.links.append(link)            
        })
        
        
        $("body").click(function(e) {
            self.dom.links.hide()
        })
        
        return self.dom.main
    }

    return self
}

    
