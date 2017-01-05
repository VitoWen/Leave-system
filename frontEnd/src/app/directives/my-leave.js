leaveApp.directive('myLeave', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        link: function (scope, element) {
            var datePicker = {
                'startDatePicker': false,
                'endDatePicker': false
            };

            scope.leaveActions = [
                {
                    'name': 'Ticket of leave',
                    'type': 'leaveForm'
                },
                {
                    'name': 'Leave records',
                    'type': 'records'
                }
            ];
            scope.listFlag = {
                'leaveType': false,
                'deputy': false
            };
            scope.warningIcon = {
                'leaveType': false,
                'deputy': false,
                'startDate': false,
                'endDate': false,
                'subject': false
            }
            scope.leaves = [
                '特別休假',
                '婚假',
                '喪假',
                '事假',
                '公假',
                '產假',
                '補休',
                '生理假',
                '公傷病假',
                '普通傷病假',
                '家庭照顧假',
            ];
            scope.deputies = [
                'Vito'
            ];
            scope.currentActive = 'leaveForm';
            scope.leaveType = '';
            scope.myDeputy = '';

            scope.triggerActions = function (evt, type) {
                if (evt) evt.stopPropagation();

                scope.currentActive = type;
            };

            scope.toggleDatepicker = function (evt, type) {
                var id = '#' + type,
                    datePanelH = $(id).height(),
                    gap = 5,
                    position = $(id).position(),
                    datepickerId = id + 'Picker',
                    defaultTime = $(id).val().length ? $(id).val().split(' ')[1].split(':') : [];
                    _selectDate = function (date) {
                        $(id).val(date);
                    },
                    opts = {
                        onSelect: _selectDate,
                        dateFormat: 'yy-mm-dd',
                        stepMinute: 10,
                        changeYear: true,
                        changeMonth: true,
                        showTime: false,
                        showButtonPanel: false,
                        defaultDate: $(id).val(),
                        hour: defaultTime[0],   
                        minute: defaultTime[1]
                    };

                scope.warningIcon[type] = false;
                datePicker[datepickerId] = !datePicker[datepickerId];

                $(datepickerId).css({
                    'position': 'relative',
                    'margin-top': '5px',
                    'z-index': 1
                });
                if (datePicker[datepickerId]) {
                    $(datepickerId).datetimepicker(opts);
                } else {
                    $(datepickerId).datetimepicker('destroy');
                }
            };

            scope.toggleList = function (evt, listName) {
                if (evt) evt.stopPropagation();
                
                scope.listFlag[listName] = !scope.listFlag[listName];
                scope.warningIcon[listName] = false;
            }

            scope.setLeaveType = function (evt, type) {
                if (evt) evt.stopPropagation();
                
                scope.leaveType = type;
                scope.listFlag.leaveType = false;
            };

            scope.setDeputy = function (evt, name) {
                if (evt) evt.stopPropagation();

                scope.myDeputy = name;
                scope.listFlag.deputy = false;
            };

            scope.submit = function (evt) {
                var $elem = $((evt.target || evt.srcElement)),
                    params = $elem.serializeJSON({
                        parseAll: false,
                        parseNumbers: false
                    });

                scope.warningIcon.leaveType = params.leave.leaveType.length ? false : true;
                scope.warningIcon.deputy = params.leave.deputy.length ? false : true;
                scope.warningIcon.startDate = params.leave.startDate.length ? false : true;
                scope.warningIcon.endDate = params.leave.endDate.length ? false : true;
                scope.warningIcon.subject = params.leave.subject.length ? false : true;

                if (validation()) {
                    console.log('[U3D] Send to BE');
                }
            };

            function validation() {
                if (scope.warningIcon.leaveType && 
                    scope.warningIcon.deputy && 
                    scope.warningIcon.startDate &&
                    scope.warningIcon.endDate && 
                    scope.warningIcon.subject) {
                    return true;
                } else {
                    return false
                }
            }
        },
        templateUrl: 'views/leave/leave.html'
    };
}]);

