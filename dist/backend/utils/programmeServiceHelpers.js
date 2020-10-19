"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleInfoJsonFormatter = void 0;
function scheduleInfoJsonFormatter(rows) {
    if (rows.length === 0)
        return null;
    function extractProgrammeInfo(targetRow, rows) {
        return rows
            .filter(function (r) { return r.scheduleId === targetRow.scheduleId; })
            .reduce(function (acc, _a, index) {
            var scheduleId = _a.scheduleId, scheduleName = _a.scheduleName, weekCount = _a.weekCount, programmeId = _a.programmeId, programmeName = _a.programmeName;
            console.log(scheduleId);
            if (index === 0) {
                if (programmeId && programmeName) {
                    return {
                        scheduleId: scheduleId,
                        scheduleName: scheduleName,
                        weekCount: weekCount,
                        programmes: [{ programmeId: programmeId, programmeName: programmeName }],
                    };
                }
                else {
                    return {
                        scheduleId: scheduleId,
                        scheduleName: scheduleName,
                        weekCount: weekCount,
                        programmes: [],
                    };
                }
            }
            else {
                if (programmeId && programmeName) {
                    acc.programmes.push({ programmeId: programmeId, programmeName: programmeName });
                }
                return acc;
            }
        }, { scheduleId: 0, scheduleName: "", weekCount: 0, programmes: [] });
    }
    var processed = [];
    var res = [];
    rows.forEach(function (r) {
        if (!processed.includes(r.scheduleId)) {
            console.log(r.scheduleId);
            processed.push(r.scheduleId);
            res.push(extractProgrammeInfo(r, rows));
        }
    });
    console.log(processed);
    return res;
}
exports.scheduleInfoJsonFormatter = scheduleInfoJsonFormatter;
