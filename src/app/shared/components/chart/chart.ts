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
import {PortfolioValueModel} from '../../../core/models/portfolio-value.model';

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
    portfolioValues: PortfolioValueModel[] = [];

    @Input()
    cryptoSymbol: string = '';

    @ViewChild('chartCanvas', {static: false})
    chartCanvas!: ElementRef<HTMLCanvasElement>;

    private chart: any = null;

    ngAfterViewInit() {
        setTimeout(() => this.renderChart(), 0);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['datas'] || changes['cryptoSymbol'] || changes['portfolioValues']) {
            setTimeout(() => this.renderChart(), 0);
        }
    }

    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    private renderChart() {
        if (!this.chartCanvas?.nativeElement) return;

        // Si on a des portfolio values, on affiche un line chart
        if (this.portfolioValues?.length) {
            this.renderPortfolioChart();
            return;
        }

        // Sinon, on affiche le candlestick chart
        if (!this.datas?.length) return;

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

    private renderPortfolioChart() {
        if (!this.portfolioValues?.length) {
            return;
        }
        
        const sortedData = [...this.portfolioValues].sort((a, b) =>
            a.date.getTime() - b.date.getTime()
        );

        if (this.chart) {
            this.chart.destroy();
        }

        const config: any = {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Portfolio Value',
                    data: sortedData.map(d => ({
                        x: d.date.getTime(),
                        y: d.value
                    })),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.1,
                    fill: false,
                    pointRadius: 2,
                    pointHoverRadius: 4,
                    pointBackgroundColor: 'rgb(59, 130, 246)',
                    pointBorderColor: 'rgb(59, 130, 246)',
                    pointBorderWidth: 1
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
                                return `Value: $${context.parsed.y.toFixed(2)}`;
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
