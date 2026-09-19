import { RiDice5Fill, RiLineChartLine } from '@remixicon/react';

const asset = (name: string) => `/images/score-counter/${name}.webp`;
const phone = 'absolute h-auto outline-none';

/** Real product assets and proportions from the Paper canvas. */
export function ProductShowcase() {
  return (
    <section
      aria-labelledby='features-heading'
      className='sc-showcase w-full text-left'>
      <h2 id='features-heading' className='sc-section-title text-center'>
        Simple by <em className='sc-highlight'>design</em>
      </h2>
      <div className='mt-10 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-6'>
        <article className='sc-score-panel card-shadow relative w-full min-w-0 min-h-[320px] aspect-square overflow-hidden rounded-3xl bg-[#17171D] text-white md:row-span-2 md:aspect-auto md:rounded-[32px]'>
          <div className='absolute inset-x-[6%] top-[6%]'>
            <h3 className='text-[clamp(27px,3vw,39px)] font-medium leading-[1.2] tracking-[-0.035em]'>
              Score your{' '}
              <em className='sc-highlight sc-highlight-yellow'>way</em>
            </h3>
            <p className='mt-2 text-[clamp(13px,1.4vw,18px)] text-[#BDBBC5]'>
              Every player. Every game. Every point.
            </p>
          </div>
          <img
            src={asset('score-players')}
            width={440}
            height={928}
            loading='lazy'
            decoding='async'
            alt='Named player counters with individual colors.'
            className={`${phone} bottom-[8%] right-[12%] w-[28%] rotate-[7deg]`}
          />
          <img
            src={asset('score-grid')}
            width={440}
            height={928}
            loading='lazy'
            decoding='async'
            alt='Entering a score with quick-add buttons and a keypad.'
            className={`${phone} bottom-[5%] left-[35.5%] w-[27.5%]`}
          />
          <img
            src={asset('score-list')}
            width={440}
            height={928}
            loading='lazy'
            decoding='async'
            alt='A grid of eight colorful player counters in dark theme.'
            className={`${phone} bottom-[6%] left-[8.5%] w-[27%] md:w-[29%] -rotate-[7deg]`}
          />
        </article>
        <article className='card-shadow relative w-full min-w-0 min-h-[180px] aspect-[350/202] rounded-3xl bg-[#D7FAEA] text-[#17171D] md:aspect-[616/294] md:rounded-[32px]'>
          <div className='absolute left-[5.4%] top-[9%]'>
            <h3 className='text-[clamp(21px,2.3vw,32px)] font-medium leading-[1.18] tracking-[-0.03em]'>
              See score
              <br />
              progress
            </h3>
            <p className='mt-3 text-[clamp(12px,1.25vw,17px)] leading-[1.45] text-[#476455]'>
              Follow every turn.
              <br />
              Watch the lead change.
            </p>
          </div>
          <div
            aria-hidden='true'
            className='absolute right-[7%] top-[13%] h-[70%] w-[32%] rotate-[14deg] rounded-[24px] bg-[#FFE45E]'
          />
          <img
            src={asset('score-history')}
            width={440}
            height={928}
            loading='lazy'
            decoding='async'
            alt='Score history graph showing how the lead changes each turn.'
            className={`${phone} right-[13%] top-[10%] w-[22%] rotate-[8deg] md:top-[-6%]`}
          />
          <RiLineChartLine
            aria-hidden='true'
            className='absolute bottom-[12%] right-[41%] size-9 rounded-full bg-[#05C889] p-1.5 text-white shadow-[0_1px_2px_oklch(0_0_0/0.12),0_4px_12px_oklch(0_0_0/0.08)] lg:size-16 lg:p-3'
          />
        </article>
        <article className='sc-tools-panel card-shadow relative w-full min-w-0 min-h-[190px] aspect-[350/202] overflow-hidden rounded-3xl bg-[#FFE6DB] text-[#17171D] md:aspect-[616/294] md:rounded-[32px]'>
          <div className='absolute left-[5.4%] top-[9%]'>
            <h3 className='text-[clamp(20px,2.2vw,31px)] font-medium leading-[1.2] tracking-[-0.03em]'>
              Dice built in.
              <br />
              Timer built in.
            </h3>
            <p className='mt-3 text-[clamp(12px,1.25vw,17px)] leading-[1.45] text-[#795C50]'>
              Roll the dice. Set the pace.
              <br />
              Keep the game going.
            </p>
          </div>
          <img
            src={asset('dice')}
            width={440}
            height={928}
            loading='lazy'
            decoding='async'
            alt='Built-in dice roller showing a roll of twenty.'
            className={`${phone} bottom-[9%] right-[26%] w-[16.5%] -rotate-[10deg]`}
          />
          <img
            src={asset('timer')}
            width={440}
            height={928}
            loading='lazy'
            decoding='async'
            alt='Game timer with a circular countdown and pause control.'
            className={`${phone} bottom-[9%] right-[4%] w-[19%] rotate-[6deg]`}
          />
          <RiDice5Fill
            aria-hidden='true'
            className='absolute bottom-[12%] left-[6%] size-9 -rotate-[10deg] rounded-lg bg-white p-1.5 text-[#D88868] shadow-[0_1px_2px_oklch(0_0_0/0.12),0_4px_12px_oklch(0_0_0/0.08)] lg:size-12 lg:rounded-xl lg:p-2'
          />
        </article>
      </div>
    </section>
  );
}
