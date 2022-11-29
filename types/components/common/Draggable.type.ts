import { DragControls, HTMLMotionProps } from 'framer-motion';

export type DraggableProps = {
  children: React.ReactNode;
  dragControls: DragControls;
  dragConstraints: { top: number; bottom: number; left: number; right: number };
} & Pick<
  HTMLMotionProps<'div'>,
  'dragElastic' | 'dragListener' | 'dragControls' | 'dragMomentum'
>;
