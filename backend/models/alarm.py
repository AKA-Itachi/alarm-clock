from typing import Optional
from models.base import BaseDBModel


class Alarm(BaseDBModel):
    alarm_time: str
    day_of_week: str
    is_snoozed: Optional[bool] = False
    snooze_count: Optional[int] = 0
