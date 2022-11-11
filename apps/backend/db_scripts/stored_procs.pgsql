SELECT 
s."scheduleId", s."scheduleName", s."weekCount",
p."programmeId", p."programmeName"
FROM schedule s
LEFT JOIN programme_schedule ps
ON s."scheduleId" = ps."scheduleId"
LEFT JOIN programme p
ON ps."programmeId" = p."programmeId";

[{
    scheduleId: 0,
    scheduleName: '',
    programmes: [
        {programmeId: 1, programmeName: ''}
        {programmeId: 1, programmeName: ''}
    ]
}]