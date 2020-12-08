# Sanity Movies Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- Check out one of the example frontends: [React](https://github.com/sanity-io/example-frontend-next-js) | [React Native](https://github.com/sanity-io/example-app-react-native) | [Vue](https://github.com/sanity-io/example-frontend-vue-js) | [PHP](https://github.com/sanity-io/example-frontend-silex-twig)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
## Notes

python3 data-prep.py > to-import.ndjson
sanity dataset import to-import.ndjson production --replace


*[_type == 'question' && ('manipulace-s-grafy' in topics[]->slug.current)]
//*[_type == 'topic' && id == '7554228'][0]
// 'manipulace-s-grafy'
//*[_type == 'topic' && slug.current == 'manipulace-s-grafy']._id[0]
