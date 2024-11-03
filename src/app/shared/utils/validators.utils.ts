import { Injectable } from "@angular/core";
import moment from "moment";

@Injectable({
    providedIn: "root"
})
export class ValidatorsUtils {
    private readonly daysPosition: any = {
        'lun': 0,
        'mon': 0,
        'mar': 1,
        'tue': 1,
        'mié': 2,
        'wed': 2,
        'jue': 3,
        'thu': 3,
        'vie': 4,
        'fri': 4,
        'sáb': 5,
        'sat': 5,
        'dom': 6,
        'sun': 6
    };

    public intervalSearch: any;

    constructor() {
        moment.locale('es');
    }

    public dynamicColor(a: number = 100) {
        a = a / 100;

        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    public initSkeleton(array: any[], itemsForRows: number) {
        array = [];

        for (let i = 0; i < itemsForRows; i++) {
            array.push({});
        }

        return array;
    }

    public calcDays(startDate: string, endDate: string) {
        let diffInDays = moment(startDate).diff(moment(endDate), "days");
        return diffInDays;
    }

    public getCurrentHours(booked: any): boolean {
        let date = Number(moment().format('HH:mm').split(':').join(""));

        let startTime = Number(booked.time_reservations.split(':').join(""));
        let endTime = Number(booked.time_end_reservations.split(':').join(""));
        let currentTime = date;

        return startTime <= currentTime && currentTime < endTime;
    }

    public calcTime(time: any) {
        let _time = time * 60;
        let hour: any = Math.floor(_time / 3600);
        let minute: any = Math.floor((_time / 60) % 60);

        if (hour === 0 && minute != 0) {
            return `${minute} ${minute <= 1 ? ' minuto' : ' minutos'}`;
        } else if (hour != 0 && minute === 0) {
            return `${hour} ${hour <= 1 ? ' hora' : ' horas'}`;
        } else {
            return `${hour} ${hour <= 1 ? ' hora' : ' horas'} ${minute} ${minute <= 1 ? ' minuto' : ' minutos'}`;
        }
    }

    public getHours(date: string, time: string, minutes: number = 1) {
        let now = new Date(`${date}T${time}`);
        let hourCurrent = moment().format('YYYY-MM-DD HH:mm');
        let arrHours = [];

        for (var i = 1; i < 1440 / minutes; i++) {
            now.setMinutes(now.getMinutes() + minutes);
            let hour = now.getHours() <= 9 ? '0' + now.getHours() + ":" + ("00" + now.getMinutes()).slice(-2) : now.getHours() + ":" + ("00" + now.getMinutes()).slice(-2);

            arrHours.push({
                date: moment(date).format('YYYY-MM-DD'),
                time_24: hour,
                time_12: moment(date + ' ' + hour).format('h:mm a'),
                past: moment(hourCurrent).valueOf() > moment(date + ' ' + hour).valueOf() ? true : false
            });
        }

        return arrHours;
    }

    public formatHour24(hora: any): any {
        let pm = hora.includes("PM");
        let _format24;

        hora = hora.replace("PM", "").replace("AM", "").trim();
        let _firstNumber = Number(hora.split(":")[0]);

        if (pm) {
            if (_firstNumber === 12) {
                _format24 = hora;
            } else {
                _format24 = _firstNumber + 12;
                _format24 = _format24 + ':' + hora.split(":")[1];
            }
        } else {
            _format24 = hora;
        }

        if (Number(_format24.split(":")[0]) <= 9 && !_format24.split(":")[0].includes('0')) {
            _format24 = `0${_format24.split(":")[0]}:${_format24.split(":")[1]}`;
        }

        return _format24;
    }

    public getAlmanac() {
        const months: any[] = [];
        const currentYear = moment().format("YYYY-MM-DD");

        for (let i = 0; i < 12; i++) {
            months.push({
                year: Number(moment(currentYear).add(i, "month").format("YYYY")),
                monthName: moment(currentYear).add(i, "month").format("MMMM"),
                month: Number(moment(currentYear).add(i, "month").format("MM")),
                month_index: i
            });
        }

        const almanac = months.map((month: { year: number, monthName: string, month: number, month_index: number }) => {
            const days = [...Array(Number(moment(`${month.year}-${month.month <= 9 ? '0' + month.month : month.month}-01`).endOf('month').format("DD"))).keys()];

            let weekOfMonth = [];
            for (let d of days) {
                let _repite = false;
                let _d = (d + 1);
                let date = `${month.year}-${month.month <= 9 ? '0' + month.month : month.month}-${_d <= 9 ? '0' + _d : _d}`;

                for (let item of weekOfMonth) {
                    if (JSON.stringify(item) === JSON.stringify(this.getWeeks(moment(date).format("YYYY-MM-DD")))) {
                        _repite = true;
                    }
                }

                if (!_repite) {
                    weekOfMonth.push(this.getWeeks(moment(date).format("YYYY-MM-DD")));
                }
            }

            return {
                month: month.month,
                monthName: month.monthName,
                weekOfMonth,
                year: month.year,
                is_active: false
            };
        });

        return almanac;
    }

    public getWeeks(_fecha: any, iteraciones = 7) {
        let current = moment().format('YYYY-MM-DD')
        let _structuraFecha = moment(_fecha).isoWeekday(1).startOf('isoWeek')

        const s = iteraciones
        let semana = []
        for (let i = 0; i < s; i++) {
            semana.push({
                date: _structuraFecha.format('YYYY-MM-DD'),
                date_ms: moment(_structuraFecha.format('YYYY-MM-DD HH:mm')).valueOf(),
                year: _structuraFecha.format('YYYY'),
                day: _structuraFecha.format('DD'),
                day_text: _structuraFecha.format('ddd').replace('.', ''),
                month: Number(_structuraFecha.format('MM')),
                position: this.daysPosition[`${_structuraFecha.format('ddd').replace('.', '')}`],
                month_text: _structuraFecha.format('MMM').replace('.', ''),
                past: moment(current).valueOf() > _structuraFecha.valueOf() ? true : false,
                current: _structuraFecha.valueOf() === moment(current).valueOf() ? true : false
            })
            _structuraFecha.add(1, 'd')
        }
        return semana
    }

    public onlyTextTypeUsername(event: any) {
        event.target.value = event.target.value.trim();

        let regex = /^[a-zA-Z\u00C0-\u017F0123456789]+$/;
        if (regex.test(event.key) || event.key === 'Backspace' || event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Tab' || event.key === 'Delete') {
            return true;
        } else {
            return false;
        }
    }

    public onlyTextEmail(event: any) {
        event.target.value = event.target.value.trim();

        let regex = /^[a-zA-Z\u00C0-\u017F0123456789.!#$'*+/=?^@_`{|}~-]+$/;
        if (regex.test(event.key) || event.key === 'Backspace' || event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Tab' || event.key === 'Delete') {
            return true;
        } else {
            return false;
        }
    }

    public onlyTextAndSpaces(event: any) {
        event.target.value = event.target.value.trimStart();
        event.target.value = event.target.value.replace(/[`1234567890`~!°@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        if (event.key === '-' && event.target.value.length === 1) {
            event.target.value = "";
        }
        let regex = /^[a-zA-Z\u00C0-\u017F -]+$/;
        if (regex.test(event.key) || event.key === 'Backspace' || event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Tab' || event.key === 'Delete') {
            return true;
        } else {
            return false;
        }
    }

    public onlyTextNumberAndSpaces(event: any) {
        event.target.value = event.target.value.trimStart();
        event.target.value = event.target.value.replace(/[`~!°@#$%^*()|\=?;:",<>\{\}\[\]\\\/]/gi, '');

        let regex = /^[a-zA-Z\u00C0-\u017F0123456789 +_&-.']+$/;
        if (regex.test(event.key) || event.key === 'Backspace' || event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Tab' || event.key === 'Delete') {
            return true;
        } else {
            return false;
        }
    }

    public onlyTextNumber(event: any) {
        event.target.value = event.target.value.trim();
        event.target.value = event.target.value.replace(/[`~!°@#$%^*()|\=?;':",_+.<>\{\}\[\]\\\/]/gi, '');
        if (event.key === '-' && event.target.value.length === 1) {
            event.target.value = "";
        }
        let regex = /^[a-zA-Z\u00C0-\u017F0123456789.-]+$/;
        if (regex.test(event.key) || event.key === 'Backspace' || event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Tab' || event.key === 'Delete') {
            return true;
        } else {
            return false;
        }
    }

    public onlyNumberAndPoints(event: any, validpoint: boolean = false, validcoma: boolean = false) {
        event.target.value = event.target.value.trim();
        let regex = validpoint && !validcoma ? /^[0-9\.]$/ : !validpoint && validcoma ? /^[0-9\,]$/ : validpoint && validcoma ? /^[0-9\,.]$/ : /^[0-9]$/;
        if (regex.test(event.key) || event.key === 'Backspace' || event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Tab' || event.key === 'Delete') {
            if (validpoint && !validcoma) {
                if (event.target.value.includes('.') && event.key === '.') {
                    return false;
                } else {
                    return true;
                }
            } else if (!validpoint && validcoma) {
                return true;
            } else if (validpoint && validcoma) {
                if (event.target.value.includes('.') && event.key === '.') {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    public compressImage(file: any, percentageQuality: number = 60) {
        return new Promise((resolve, reject) => {
            const _cnvs = document.createElement('canvas');
            const _img = new Image();
            const _pQuality = (percentageQuality / 100);

            _img.onload = () => {
                _cnvs.width = _img.width;
                _cnvs.height = _img.height;
                _cnvs.getContext("2d")?.drawImage(_img, 0, 0);
                _cnvs.toBlob((blob) => {
                    if (blob === null) {
                        return reject(blob);
                    } else {
                        resolve(blob);
                    }
                }, "image/jpeg", _pQuality);
            };

            _img.src = file;
        });
    }

    public blobToBase64(blob: Blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    public generateColorHex() {
        const character: string = "0123456789ABCDEF";
        let color: string = "#";

        for (let i = 0; i < 6; i++) {
            color = `${color}${character[Math.floor(Math.random() * 16)]}`;
        }

        return color;
    }

    public generateVoucherID(id: number, length: number) {
        let numberOutput = Math.abs(id);
        let _length = id.toString().length;
        let zero = "0";

        if (length <= _length) {
            if (id < 0) {
                return ("-" + numberOutput.toString());
            } else {
                return numberOutput.toString();
            }
        } else {
            if (id < 0) {
                return ("-" + (zero.repeat(length - _length)) + numberOutput.toString());
            } else {
                return ((zero.repeat(length - _length)) + numberOutput.toString());
            }
        }
    }

    public changeTitleNoGoodBye(title: string) {
        let oldTitle = title;

        window.addEventListener("blur", () => {
            document.title = "¡No te vayas! ¡Vuelve! 😱";
        });

        window.addEventListener("focus", () => {
            document.title = oldTitle;
        });
    }

    public downloadPDF(file: any, nameFile: string) {
		let binary = atob(`${file.split(',')[1]}`);

		let array = [];
		for (let j = 0; j < binary.length; j++) {
			array.push(binary.charCodeAt(j));
		}

		let contenido = new Blob([new Uint8Array(array)], {
			type: 'application/pdf'
		});

        let a = document.createElement('a');
        document.body.appendChild(a);
        let url = window.URL.createObjectURL(contenido);

        a.download = nameFile + '.pdf';

		a.href = url;
		a.click();
		window.URL.revokeObjectURL(url);
		a.remove();

	}

    public hiddenOptions(id: number): boolean {
        return id === 365;
    }
}