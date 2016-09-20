/**
 * calendarDemoApp - 0.9.0
 */
angular.module('app').controller('CalendarController', function($location, $log, $scope, $compile, uiCalendarConfig, $uibModal, unavailService, CurrentUser) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    $scope.changeTo = 'Hungarian';
    $scope.events = [];
    /* event source that pulls from google.com */
    $scope.eventSource = {
        url: "/unavailability/getCalData?userId=" + CurrentUser.user().id,// add source of working api
        className: 'performer-unavailability',           // an option!
    };
    /*get performers job events*/
    $scope.eventSourceJobs = {
        url: "/assignment/getCalData?userId=" + CurrentUser.user().id,// add source of working api
        className: 'performer-event',           // an option!
    };

    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      /*var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);*/
    };

    //on click over events present modal with popup and an option to delete
    $scope.eventOnClick = function( calEvent, jsEvent, view ){ 
        if(calEvent.className.indexOf('performer-event') != 0) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'templates/performer/popUp-window/eventDetail.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    modalData: function() {
                            var eventData = {
                                id: calEvent.id,
                                title: calEvent.title,
                                startDate: calEvent.start.format(),
                                endDate: calEvent.end.format(),
                                view: view.name,
                                allDay: calEvent.allDay
                            };
                        return eventData;
                    }
                }
            }).result.then(function (res) {
                if(res.status == 'success') {
                    $('div#Calendar').fullCalendar('removeEvents', res.id);
                } else {
                    alert('Opps something went terribly wrong.');
                }
            });
        }  
    };

    /* on drop updatabase for unavailability */
    $scope.eventOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
        if (moment().diff(event.start.format(), 'days') > 0) {
            revertFunc();
            alert("Cannot update availability for past date!");
        } else {
            var eventData = {
                id: event.id,
                start: event.start.format(),
                end: event.end.format()  
            }
            unavailService.updateEvent(eventData).success(function(result){
                if(result.type == 'success') {
                    alert('Event manipulated successfully!');
                } else {
                    revertFunc();
                }
            });
        }
    };
    /* on resize of event update database no check required */
    $scope.eventOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
        $log.log(event.title + " end is now " + event.end.format());
        if (moment().diff(event.start.format(), 'days') > 0) {
            alert("Cannot update availability for past date!");
        } else {
            var eventData = {
                id: event.id,
                end: event.end.format()  
            }
            unavailService.updateEvent(eventData).success(function(result){
                if(result.type == 'success') {
                    alert('Event manipulated successfully!');
                } else {
                    revertFunc();
                }
            });
        }
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
        var canAdd = 0;
          angular.forEach(sources,function(value, key){
            if(sources[key] === source){
              sources.splice(key,1);
              canAdd = 1;
            }
          });
        if(canAdd === 0){
            sources.push(source);
        }
    };


    /* add custom event*/
    $scope.addEvent = function( date, jsEvent, view ) {
        if (moment().diff(date, 'days') > 0) {
            alert("Cannot update availability for past date!");
        } else {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'templates/performer/popUp-window/myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    modalData: function() {
                        var eventData = {
                            startDate: start.format('YYYY-MM-DD[T]hh:mm:ss'),
                            endDate: end.format('YYYY-MM-DD[T]hh:mm:ss'),
                            view: view.name
                        };
                        return eventData;
                    }
                }
            }).result.then(function (selectedItem) {
                if (selectedItem.status == 'Success') {
                    $scope.events.push(selectedItem.event);
                }
            });
        }
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      //uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      /*if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }*/
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) { 
        //console.log(event);
        /*element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);*/
    };

    /**Select time of availability and unavailability**/
    $scope.selectEvent = function( start, end, jsEvent, view ) { 
        if (moment().diff(start, 'days') > 0) {
            alert("Cannot update availability for past date!");
        } else {
            //check if event is of all day or specified time;
            var allDayEvent = false;
            if(start.format().indexOf('T') === -1){
                allDayEvent = true;
            } 
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'templates/performer/popUp-window/myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    modalData: function() {
                        var eventData = {
                            startDate: start.format(),
                            endDate: end.format(),
                            view: view.name,
                            allDay: allDayEvent
                        };
                        return eventData;
                    }
                }
            }).result.then(function (selectedItem) {
                if (selectedItem.status == 'success') { 
                    $scope.events.push(selectedItem.event);
                }
            });
        }
    };
    /* config object */
    $scope.uiConfig = {
        calendar:{
            editable: true,
            selectable: true,
            eventOverlap: false,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            //dayClick: $scope.addEvent,
            eventClick: $scope.eventOnClick,
            eventDrop: $scope.eventOnDrop,
            eventResize: $scope.eventOnResize,
            eventRender: $scope.eventRender,
            select: $scope.selectEvent
        }
    };

    /*$scope.changeLang = function() {
      if($scope.changeTo === 'Hungarian'){
        $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        $scope.changeTo= 'English';
      } else {
        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $scope.changeTo = 'Hungarian';
      }
    };*/
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventSourceJobs/*, $scope.eventsF*/];
    //$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
    
    // Pop up window Settings
    $scope.animationsEnabled = true;
    
    // Full Calender with Pop up
    var eventsArray = [];
    
    /*unavailService.getUnavailableData().then(function(result) {
        $scope.unavailable = result.data.unavailable;
        
        angular.forEach($scope.unavailable, function(value) {
            var eventData1 = {};
            eventData1.title = value.status;
            eventData1.start = value.unavailabilityDateTime;
            eventsArray.push(eventData1);
        });
        
        $(document).ready(function() {
        $scope.events = [];
        var default1 = new Date();
        
        $('#calendar').fullCalendar({
            header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
            },
            defaultDate: default1,
            eventClick: function(calEvent, jsEvent, view){
                alert("Here I am ");
                console.log("Event",calEvent)
                $(".closon").click(function() {
                    alert("Delete Event")
                    $('#calendar').fullCalendar('removeEvents',event._id);
                    //unavailService.deleteEvent().then(function(result){
                    //    console.log("Deleted", result);
                    //})
                });
            },
           
            selectable: true,
            selectHelper: true,
            dayClick:function(startDate,endDate,allDay,jsEvent,view) {
                var d1 = startDate._d.getDate();
                var m1 = startDate._d.getMonth() + 1;
                var y1 = startDate._d.getFullYear();
                var sel = '' + y1 + '-' + (m1<=9 ? '0' + m1 : m1) + '-' + (d1 <= 9 ? '0' + d1 : d1);
                var selectedDate = new Date(sel).getTime();
                
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth() + 1;
                var y = date.getFullYear();
                var newdate = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
                var currentDate = new Date(newdate).getTime();
                console.log(selectedDate);
                console.log(currentDate);
                var titleExists = false;
                angular.forEach(eventsArray, function(value) {
                    var loopDate = new Date(value.start).getTime();
                    if (loopDate == selectedDate) {
                        titleExists = true;
                    }
                });
                if (titleExists == true) {
                    alert("Already have Schedule");
                }else if (titleExists == false) {
                    if(selectedDate >= currentDate){
                    
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'templates/performer/popUp-window/myModalContent.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                          startDate: function () {
                            return startDate._d;
                          }
                        }
                    }).result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                        var eventData;
                        if ($scope.selected) {
                                eventData = {
                                        title: $scope.selected.status,
                                        start: start,
                                        end: end
                                };
                                $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                                $scope.events.push(eventData);
                        }
                    });
                    } else{
                        alert("Previous");
                    }
                }
                
            },
            //select: function(start, end) {
            //    var startDate = start._d;
            //    //var getEvents = $('#calendar').fullCalendar('getView');
            //    var selectedDay = startDate.getDate();
            //    var selectedMonth = startDate.getMonth();
            //    var selectedYear = startDate.getFullYear();
            //    var newDate = selectedDay +"/"+selectedMonth+"/"+selectedYear;
            //    var selectedDate = new Date(newDate).getTime();
            //    
            //    var currentDay = new Date().getDate();
            //    var currentMonth = new Date().getMonth();
            //    var currentYear = new Date().getFullYear();
            //    var newDate1 = currentDay +"/"+currentMonth+"/"+currentYear;
            //    var today = new Date(newDate1).getTime();
            //    
            //    console.log("Selected Date", selectedDate);
            //    console.log("Current Date", today);
            //    //console.log("Check", selectedDate)
            //    //console.log("Today",today)
            //    //var eventsArray = getEvents.options.events;
            //   // console.log("All values", eventsArray);
            //    //var titleExists = false;
            //    // angular.forEach(eventsArray, function(value) {
            //    //    var startD = value.start;
            //    //    var day1 = startD.getDate();
            //    //    if (startD == selectedDay) {
            //    //        if (value.status) {
            //    //            titleExists = true;
            //    //        }
            //    //    }
            //    //});
            //    //if (titleExists == true) {
            //        //if(selectedDate > today) {
            //        
            //        //}
            //        //else {
            //        //   alert("Previous")
            //        //}  
            //    //}
            //    $('#calendar').fullCalendar('unselect');
            //},
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: eventsArray,
            eventAfterAllRender: function(view) {
                $(".fc-event-container").append( "<a><span class='closon'>X</span></a>" );
            }
        });
        });
    });*/
});

