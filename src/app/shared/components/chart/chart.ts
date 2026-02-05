import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {Chart, LinearScale, registerables, TimeScale} from 'chart.js';
import {CandlestickController, CandlestickElement} from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import {CandleModel} from '../../../core/models/candle.model';

Chart.register(
    ...registerables,
    TimeScale,
    LinearScale,
    CandlestickController,
    CandlestickElement
    );

@Component({
    selector: 'app-chart',
    imports: [],
    templateUrl: './chart.html',
    styleUrl: './chart.scss',
})
export class ChartComponent implements AfterViewInit, OnChanges, OnDestroy {
    @Input()
    datas: CandleModel[] = [];

    @Input()
    cryptoSymbol: string = '';

    @ViewChild('chartCanvas', {static: false})
    chartCanvas!: ElementRef<HTMLCanvasElement>;

    private chart: any = null;

    ngAfterViewInit() {
        setTimeout(() => this.renderChart(), 0);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['datas'] || changes['cryptoSymbol']) {
            setTimeout(() => this.renderChart(), 0);
        }
    }

    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    private renderChart() {
        if (!this.chartCanvas?.nativeElement || !this.datas?.length) return;

        const sortedData = [...this.datas].sort((a, b) =>
            new Date(a.open_time).getTime() - new Date(b.open_time).getTime()
        );

        if (this.chart) {
            this.chart.destroy();
        }

        const config: any = {
            type: 'candlestick',
            data: {
                datasets: [{
                    label: `${this.cryptoSymbol}`,
                    data: sortedData.map(d => ({
                        x: new Date(d.open_time).getTime(),
                        o: d.open,
                        h: d.high,
                        l: d.low,
                        c: d.close
                    }))
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: (context: any) => {
                                const data = context.raw;
                                return [
                                    `Open: ${data.o?.toFixed(2)}`,
                                    `High: ${data.h?.toFixed(2)}`,
                                    `Low: ${data.l?.toFixed(2)}`,
                                    `Close: ${data.c?.toFixed(2)}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        border: {
                            display: true,
                            color: 'white'
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'white',
                            callback: (value: any) => {
                                return `$${value}`;
                            }
                        }
                    },
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'MMM dd',
                                month: 'MMM yyyy'
                            }
                        },
                        border: {
                            display: true,
                            color: 'white'
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'white',
                            maxRotation: 0,
                            minRotation: 0
                        }
                    }
                }
            }
        };

        const ctx = this.chartCanvas.nativeElement.getContext('2d');
        if (ctx) {
            this.chart = new Chart(ctx, config);
        }
    }
}
