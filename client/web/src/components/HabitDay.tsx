import '../styles/global.css'
import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';

interface HabitDayProps {
    completed: number
    amount: number
}

export function HabitDay({ completed, amount }: HabitDayProps) {
    const completedPorcentage = Math.round((completed / amount) * 100)

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx('w-10 h-10 border-2 rounded-lg',
                {
                    'bg-zinc-900 border-zinc-800': completedPorcentage >= 0 && completedPorcentage < 20,
                    'bg-violet-900 border-violet-700': completedPorcentage >= 0 && completedPorcentage < 20,
                    'bg-violet-800 border-violet-600': completedPorcentage >= 20 && completedPorcentage < 40,
                    'bg-violet-700 border-violet-500': completedPorcentage >= 40 && completedPorcentage < 60,
                    'bg-violet-600 border-violet-500': completedPorcentage >= 60 && completedPorcentage < 80,
                    'bg-violet-500 border-violet-400': completedPorcentage >= 80
                })}>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2x1 bg-zinc-900 flex flex-col'>
                    <span className='font-semibold text-zinc-400'>terça-feira</span>
                    <span className='mt-1 font-extrabold leading-tight text-3x1'>17/01</span>

                    <ProgressBar progress={75} />

                    <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>

    )
}