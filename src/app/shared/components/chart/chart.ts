import {Component, ElementRef, Input, OnChanges, OnDestroy, AfterViewInit, SimpleChanges, ViewChild} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {ChartDataPoint} from '../../../core/models/chart-data-point';

Chart.register(...registerables);

@Component({
    selector: 'app-chart',
    imports: [],
    templateUrl: './chart.html',
    styleUrl: './chart.css',
})
export class ChartComponent implements AfterViewInit, OnChanges, OnDestroy {
    @Input()
    datas: ChartDataPoint[] = [];

    @Input()
    cryptoSymbol: string = 'Crypto';

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

        const sortedData = [...this.datas].sort((a, b) => a.time.getTime() - b.time.getTime());

        if (this.chart) {
            this.chart.destroy();
        }

        const config: any = {
            type: 'line',
            data: {
                labels: sortedData.map(d => this.formatDate(d.time)),
                datasets: [{
                    label: `Holdings (${this.cryptoSymbol})`,
                    data: sortedData.map(d => d.amount),
                    fill: false,
                    borderColor: 'rgb(59,130,246)',
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 0,
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
                                return `${context.dataset.label}: ${context.parsed.y?.toFixed(2) || 0} ${this.cryptoSymbol}`;
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
                                return `${value} ${this.cryptoSymbol}`;
                            }
                        }
                    },
                    x: {
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

    private formatDate(date: Date): string {
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
}
