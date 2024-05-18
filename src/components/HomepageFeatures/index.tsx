import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  // Png: React.ComponentType<React.ComponentProps<'png'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'CrossChain Enthusiasts',
    // Png: require('/static/img/im_1.png').default,
    description: (
      <>
        Are you someone who loves Building Products? Then do see our Courses. 
        Who knows, you might Win a Grant?
      </>
    ),
  },
  {
    title: 'Crazy Buidlers',
    // Png: require('/static/img/im_2.png').default,
    description: (
      <>
        If you’re someone who actively Builds in Web3 Space and is interested in Learning cross-chain Development? 
        Don't forget to visit our Platform.
      </>
    ),
  },
  {
    title: 'Potential Dev Ambassadors',
    // Png: require('/static/img/im_3.png').default,
    description: (
      <>
        Router Academy offer Rewards at every step, whether you Complete a Course or Become an Ambassador, 
        you’re all in.
      </>
    ),
  },
];


function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
      </div>
      <div className={clsx('text--center', 'padding-horiz--md', 'feature-title-container')}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}
export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}



