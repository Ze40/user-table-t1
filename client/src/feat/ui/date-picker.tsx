import { type Ref, forwardRef, useState } from "react";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

interface DatePickerProps {
  className?: string;
  value?: string;
  onChange?: (date: string | undefined) => void;
  ref?: Ref<typeof Button>;
}

const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ className, value, onChange }, ref) => {
    const [date, setDate] = useState<Date | undefined>(value ? new Date(value) : undefined);

    const handleSelect = (date: Date | undefined) => {
      setDate(date);
      if (onChange) {
        onChange(date?.toISOString());
      }
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            data-empty={!date}
            className={cn(
              "data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal",
              className
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Выбрать дату</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => handleSelect(date)}
            locale={ru}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

export default DatePicker;
