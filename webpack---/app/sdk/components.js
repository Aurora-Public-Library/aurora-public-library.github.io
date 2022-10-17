import loadable from '@loadable/component';

// Feedback
export const FeedbackBox = loadable(() => import('app/components/layouts/FeedbackBox/FeedbackBoxContainer'));

// Widgets
export const BibWidget = loadable(() => import('app/components/widgets/BibWidget/BibWidgetContainer'));

// Opt-In
export const PreviewBar = loadable(() => import('app/components/shared/PreviewBar/PreviewBar'));
