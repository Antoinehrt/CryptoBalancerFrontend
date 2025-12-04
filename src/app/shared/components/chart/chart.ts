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
    private needsRender = false;

    ngAfterViewInit() {
        setTimeout(() => {
            this.renderChart();
        }, 0);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['datas'] || changes['cryptoSymbol']) {
            if (!this.chartCanvas || !this.chartCanvas.nativeElement) {
                this.needsRender = true;
                return;
            }
            setTimeout(() => {
                this.renderChart();
            }, 0);
        }
    }

    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    private renderChart() {
        if (!this.chartCanvas || !this.chartCanvas.nativeElement) {
            console.warn('Canvas not ready yet');
            return;
        }

        const sortedData = [...this.datas].sort((a, b) => a.time.getTime() - b.time.getTime());

        const labels = sortedData.map(d => this.formatDate(d.time));

        const amounts = sortedData.map(d => d.amount);

        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }

        const config: any = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `Possessions (${this.cryptoSymbol})`,
                    data: amounts,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: 'rgb(75, 192, 192)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: (context: any) => {
                                const value = context.parsed.y;
                                const label = context.dataset.label || '';
                                return `${label}: ${value?.toFixed(2) || 0} ${this.cryptoSymbol}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: (value: any) => {
                                return `${value} ${this.cryptoSymbol}`;
                            }
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        };
        this.needsRender = false;
    }

    private formatDate(date: Date): string {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${year}`;
    }
}
