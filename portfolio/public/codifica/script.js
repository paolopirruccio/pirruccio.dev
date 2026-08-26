$(document).ready(function() {
    initializeNavigation();
    setupTextLines();
    initializeHighlighting();
    setupAnnotationPanel();
    setupZoneHighlighting();
    setupFormWork();
    setupCorrections();
    setupReferences();
    setupQuotes();
    setupEntityLinks();
    setupColumnBreaks();

    $('a[href^="#"]').not('.entity-link, .note-ref').on('click', function(event) {
        event.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').scrollTop(target.offset().top - 70);
        }
    });
    
    setTimeout(resizeZones, 300);
    $(window).on('load', function() {
        resizeZones();
    });
});

function setupTextLines() {
    $('.text-paragraph, .list-item, p, .article-body > *, .text-column > *, .tei-list li, li').each(function() {
        const container = $(this);
        
        if (container.hasClass('processed-lines') || container.hasClass('line-break') || container.hasClass('text-line')) {
            return;
        }
        
        container.addClass('processed-lines');
        processContainerLines(container);
    });
    
    $('.column-break, .page-break').each(function() {
        if (!$(this).hasClass('text-line')) {
            $(this).addClass('text-line');
        }
    });
    
    $('.fw').each(function() {
        if (!$(this).hasClass('text-line') && !$(this).hasClass('processed-lines')) {
            $(this).addClass('text-line processed-lines');
        }
    });
}

function processContainerLines(container) {
    const lineBreaks = container.find('lb, .line-break');
    
    if (lineBreaks.length === 0) {
        container.addClass('text-line');
        const id = container.attr('id');
        if (!id) {
            container.attr('id', 'line-' + generateUniqueId());
        }
        return;
    }
    
    const containerId = container.attr('id') || 'container-' + generateUniqueId();
    const originalContent = container.html();
    const tempContainer = $('<div>').html(originalContent);
    
    let lineNumber = 1;
    tempContainer.find('lb, .line-break').each(function() {
        const lb = $(this);
        const lbId = lb.attr('id') || `${containerId}-lb-${lineNumber}`;
        
        let markerHtml = `<span class="line-marker" data-line-id="${lbId}"></span>`;
        if (lb.attr('data-break') === 'no') {
            markerHtml = '-' + markerHtml;
        }
        
        lb.before(markerHtml);
        lineNumber++;
    });
    
    const htmlWithMarkers = tempContainer.html();

    const parts = htmlWithMarkers.split(/<span class="line-marker"[^>]*><\/span>/);
    
    container.empty();
    
    parts.forEach((part, index) => {
        if (part.trim()) {
            const lbMatch = part.match(/<(?:lb|span[^>]*class="line-break"[^>]*)\s+id="([^"]+)"/);
            const lineId = lbMatch ? lbMatch[1] : `${containerId}-line-${index + 1}`;
            const cleanContent = part.replace(/<lb[^>]*>|<span[^>]*class="line-break"[^>]*><\/span>/g, '');
            const line = $(`<div class="text-line" id="${lineId}">${cleanContent}</div>`);
            container.append(line);
        }
    });
    
    container.removeClass('text-paragraph list-item');
}

let idCounter = 0;
function generateUniqueId() {
    return 'gen-' + Date.now() + '-' + (idCounter++);
}

function setupZoneHighlighting() {
    $('svg rect').css('pointer-events', 'auto');
    
    $(document).on('click', 'svg rect', function(e) {
        e.stopPropagation();
        
        const rectClass = $(this).attr('class');
        if (!rectClass) return;
        
        const targetElement = findElementById(rectClass);
        
        if (targetElement.length) {
            $('svg rect.selected').removeClass('selected');
            $('.highlight-text').removeClass('highlight-text');
            
            $(this).addClass('selected');
            targetElement.addClass('highlight-text');
            
            scrollToElement(targetElement);
        }
    });
    
    $(document).on('click', '.text-line, .fw, .article-title, .column-break, .page-break', function(e) {
        if ($(e.target).hasClass('note-ref') || $(e.target).closest('.note-ref, .entity-link').length) {
            return;
        }
        
        const elementId = $(this).attr('id');
        if (!elementId) return;
        
        const rect = findRectById(elementId);
        
        if (rect.length) {
            $('svg rect.selected').removeClass('selected');
            $('.highlight-text').removeClass('highlight-text');
            
            $(this).addClass('highlight-text');
            rect.addClass('selected');
            
            scrollToRect(rect);
        }
    });
}

function findElementById(id) {
    let element = $(`#${id}`);
    if (!element.length) {
        element = $(`.text-line[id="${id}"]`);
    }
    if (!element.length) {
        element = $(`[id="${id}"]`);
    }
    return element;
}

function findRectById(id) {
    let rect = $(`rect[class="${id}"]`);
    if (!rect.length) {
        rect = $(`rect[class*="${id}"]`);
    }
    return rect;
}

function scrollToElement(element) {
    if (!isElementInViewport(element[0])) {
        $('html, body').animate({
            scrollTop: element.offset().top - 100
        }, 300);
    }
}

function scrollToRect(rect) {
    if (!isElementInViewport(rect[0])) {
        const pageContainer = rect.closest('.page-facsimile');
        if (pageContainer.length) {
            const container = pageContainer.closest('.facsimile-container');
            const containerTop = container.offset().top;
            const rectTop = rect.offset().top;
            const scrollTop = container.scrollTop() + (rectTop - containerTop) - 50;
            
            container.animate({
                scrollTop: scrollTop
            }, 300);
        }
    }
}

function initializeNavigation() {
    $('#navigation-fab button').on('click', function(event) {
        $('.navigation-dropdown').toggleClass('active');
        event.stopPropagation();
    });
    
    $('.navigation-dropdown').on('click', function(event) {
        event.stopPropagation();
    });
    
    $('.section-link').on('click', function(event) {
        event.preventDefault();
        
        var targetId = $(this).attr('href');
        
        if (targetId === '#document-info' || targetId === '#people-section' || 
            targetId === '#places-section' || targetId === '#glossary-section') {
            
            $('.visible-section').removeClass('visible-section').addClass('hidden-section');
            $('#info-section').removeClass('hidden-section').addClass('visible-section');
            
            setTimeout(function() {
                var target = $(targetId);
                if (target.length) {
                    $('html, body').scrollTop(target.offset().top - 70);
                }
            }, 100);
        } else {
            var sectionId = targetId + '-section';
            
            $('.visible-section').removeClass('visible-section').addClass('hidden-section');
            $(sectionId).removeClass('hidden-section').addClass('visible-section');
            
            $('html, body').scrollTop(0);
        }
        
        $('.navigation-dropdown').removeClass('active');
    });
    
    $('#back-fab button, #forward-fab button').on('click', function() {
        var sections = $('.article-section, #info-section');
        var visibleSection = $('.visible-section');
        var currentIndex = sections.index(visibleSection);
        var newIndex;
        
        if ($(this).parent().attr('id') === 'back-fab') {
            newIndex = (currentIndex - 1 + sections.length) % sections.length;
        } else {
            newIndex = (currentIndex + 1) % sections.length;
        }
        
        visibleSection.removeClass('visible-section').addClass('hidden-section');
        sections.eq(newIndex).removeClass('hidden-section').addClass('visible-section');
        
        $('html, body').scrollTop(0);
    });
}

function setupAnnotationPanel() {
    $('#annotation-fab button').on('click', function() {
        $('#annotation-panel').toggleClass('hidden');
    });
    
    $('.close-panel').on('click', function() {
        $('#annotation-panel').addClass('hidden');
    });
    
    $('#reset-all').on('click', function() {
        $('.tool-btn').removeClass('active');
        $('.entity, .entity-part').removeClass('highlight');
        $('.quote').removeClass('highlighted');
        
        $('svg rect.selected').removeClass('selected');
        $('.highlight-text').removeClass('highlight-text');
    });
    
    $('.tool-btn').on('click', function() {
        $(this).toggleClass('active');
        updateHighlights();
    });

    if ($('.panel-content .quote-btn').length === 0) {
        $('.panel-content').append(`
            <button class="tool-btn quote-btn" data-type="quote" title="Evidenzia le citazioni">
                <i class="fa-solid fa-quote-left"></i> Citazioni
            </button>
        `);
    }

    $(document).on('click', '.quote-btn', function() {
        $(this).toggleClass('active');
        updateHighlights();
    });
}

function updateHighlights() {
    $('.entity, .entity-part').removeClass('highlight');
    $('.quote').removeClass('highlighted');
    
    $('.tool-btn.active').each(function() {
        const type = $(this).data('type');
        if (type) {
            if (type === 'quote') {
                $('.quote').addClass('highlighted');
            } else {
                $(`.entity.${type}, .entity-part.${type}`).addClass('highlight');
            }
        }
    });
}

function initializeHighlighting() {
    setTimeout(function() {
        $('.text-line, .fw, .article-title, .column-break, .page-break').each(function() {
            const id = $(this).attr('id');
            if (id) {
                const rect = $(`rect[class="${id}"]`);
                if (rect.length) {
                    console.log(`Collegato elemento ${id} con rettangolo SVG`);
                }
            }
        });
    }, 100);
}

function setupEntityLinks() {
    $(document).on('click', '.entity-link', function(e) {
        e.preventDefault();
        
        const targetId = $(this).attr('href');
        let targetElement;
        
        const personIds = [
            '#Pio_', '#Cavour', '#Quetelet', '#Mill', '#Goethe', 
            '#Gregorio_', '#Gioberti', '#Balbo', '#Gambetta', '#Parisi', 
            '#Vittorio_', '#Umberto_', '#Regina_', '#Lord_', '#Carnarvon', 
            '#Re_', '#Mercedes_', '#SchouvalofE', '#Platone', '#Wilbrandt', 
            '#Auerbach', '#Oliva', '#Gutzkow', '#Freidhoff', '#Supino', 
            '#Hartwig', '#Compagni', '#Monaci', '#Norton', '#Franchetti', 
            '#Sonnino', '#Gherardini', '#G_Fanti', '#Henry_', '#Eugene_', 
            '#Musset', '#Sand', '#Jules_', '#Server_', '#Namik_', '#Ernst_', 
            '#David_', '#Leopold_'
        ];
        
        if (targetId && personIds.some(id => targetId.startsWith(id))) {
            targetElement = $(targetId);
            showEntityCard(targetElement, 'person');
            return;
        }
        
        if (targetId && targetId.startsWith('#place-')) {
            targetElement = $(targetId);
            showEntityCard(targetElement, 'place');
            return;
        }
        
        if (targetId) {
            targetElement = $(targetId);
            
            if (targetElement.length && (targetElement.hasClass('glossary-card') || targetElement.closest('#glossary-section').length)) {
                showEntityCard(targetElement, 'glossary');
                return;
            }
            
            const glossaryPrefixes = [
                '#historical-', '#political-', '#religious-', '#educational-',
                '#banking-', '#discipline-', '#institutions-', '#location-',
                '#work-', '#royalty-', '#event-', '#org-', '#microfono',
                '#microscopio', '#concilio', '#amnistia'
            ];
            
            if (glossaryPrefixes.some(prefix => targetId.startsWith(prefix))) {
                if (targetElement.length) {
                    showEntityCard(targetElement, 'glossary');
                    return;
                }
            }
        }
        
        if (targetId) {
            targetElement = $(targetId);
            if (targetElement.length) {
                $('html, body').scrollTop(targetElement.offset().top - 100);
            }
        }
    });
}

function showEntityCard(element, type) {
    if (!element.length) {
        return;
    }
    
    let title, content, className;
    
    if (type === 'person') {
        title = element.find('h3').text();
        content = element.find('.person-details').html();
        className = 'persName';
    } else if (type === 'place') {
        title = element.find('h3').text();
        content = element.find('.person-details').html();
        className = 'placeName';
    } else if (type === 'glossary') {
        title = element.find('h3').text();
        content = element.find('.glossary-details').html();
        if (!content) {
            content = element.find('.definition-info').html();
        }
        if (!content) {
            const clonedElement = element.clone();
            clonedElement.find('h3').remove();
            content = clonedElement.html();
        }
        className = 'term';
    }
    
    if (!content) {
        const clonedElement = element.clone();
        clonedElement.find('h3').remove();
        content = clonedElement.html();
    }
    
    $('.entity-overlay').remove();
    
    const overlay = $(`
        <div class="entity-overlay">
            <div class="entity-card">
                <div class="entity-card-header ${className}">
                    <h3>${title}</h3>
                    <button class="entity-card-close">&times;</button>
                </div>
                <div class="entity-card-body">
                    ${content}
                </div>
            </div>
        </div>
    `);
    
    $('body').append(overlay);
    
    overlay.on('click', function(e) {
        if ($(e.target).is('.entity-overlay') || $(e.target).is('.entity-card-close')) {
            overlay.remove();
        }
    });
    
    $('.entity-card-close').on('click', function() {
        overlay.remove();
    });
}

function setupColumnBreaks() {
    $('.column-break').each(function() {
        var columnBreak = $(this);
        var div = columnBreak.closest('.text-div');
        
        div.removeClass('no-column').addClass('multi-column');
    });
}

function setupCorrections() {
    $('.choice').each(function() {
        const choice = $(this);
        
        if (choice.find('.corr-text').length) {
            choice.data('corr', choice.find('.corr-text').text());
            choice.data('sic', choice.find('.sic-hover').attr('title')?.replace('Testo originale: ', '') || '');
        } 
        else if (choice.find('.reg-text').length) {
            choice.data('reg', choice.find('.reg-text').text());
            choice.data('orig', choice.find('.orig-hover').attr('title')?.replace('Forma originale: ', '') || '');
        } 
        else if (choice.find('.abbr-text').length) {
            choice.data('abbr', choice.find('.abbr-text').text());
            choice.data('expan', choice.find('.expan-hover').attr('title')?.replace('Espansione: ', '') || '');
        }
    });
    
    $(document).on('click', '.choice', function() {
        const choice = $(this);
        
        if (choice.hasClass('showing-original')) {
            choice.removeClass('showing-original');
            
            if (choice.find('.corr-text').length) {
                choice.find('.corr-text').text(choice.data('corr'));
            } else if (choice.find('.reg-text').length) {
                choice.find('.reg-text').text(choice.data('reg'));
            } else if (choice.find('.abbr-text').length) {
                choice.find('.abbr-text').text(choice.data('abbr'));
            }
        } else {
            $('.choice.showing-original').each(function() {
                $(this).removeClass('showing-original');
                if ($(this).find('.corr-text').length) {
                    $(this).find('.corr-text').text($(this).data('corr'));
                } else if ($(this).find('.reg-text').length) {
                    $(this).find('.reg-text').text($(this).data('reg'));
                } else if ($(this).find('.abbr-text').length) {
                    $(this).find('.abbr-text').text($(this).data('abbr'));
                }
            });
            
            choice.addClass('showing-original');
            
            if (choice.find('.corr-text').length) {
                choice.find('.corr-text').html(`<span class="original-text">${choice.data('sic')}</span><span class="correction-marker"> [OCR corretto in: ${choice.data('corr')}]</span>`);
            } else if (choice.find('.reg-text').length) {
                choice.find('.reg-text').html(`<span class="original-text">${choice.data('orig')}</span><span class="correction-marker"> [normalizzato in: ${choice.data('reg')}]</span>`);
            } else if (choice.find('.abbr-text').length) {
                choice.find('.abbr-text').html(`<span class="original-text">${choice.data('abbr')}</span><span class="correction-marker"> [espanso in: ${choice.data('expan')}]</span>`);
            }
        }
    });
}

function setupReferences() {
}

function setupQuotes() {
    $(document).on('click', '.quote-btn', function() {
        $(this).toggleClass('active');
        updateHighlights();
    });
}

function setupFormWork() {
    $('.fw').each(function() {
        const fw = $(this);
        const place = fw.attr('place') || '';
        
        const placeClass = place.replace(/\s+/g, '-');
        if (placeClass) {
            fw.addClass(placeClass);
        }
        
        if (!fw.hasClass('text-line')) {
            fw.addClass('text-line');
        }
    });
}

function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function resizeZones() {
    $('.page-facsimile').each(function() {
        const container = $(this);
        const img = container.find('.facsimile-image');
        
        const currentWidth = img.width();
        const originalWidth = parseInt(img.attr('width')) || 1000;
        
        const scale = currentWidth / originalWidth;
        
        const svg = container.find('svg');
        if (svg.length) {
            const originalViewBox = svg.attr('viewBox')?.split(',');
            if (originalViewBox) {
                svg.attr('viewBox', `0,0,${originalViewBox[2]},${originalViewBox[3]}`);
                svg.attr('width', currentWidth);
                svg.attr('height', img.height());
            }
        }
    });
}

$(window).on('resize', function() {
    resizeZones();
});

$(document).on('click', function() {
    $('.navigation-dropdown').removeClass('active');
});
