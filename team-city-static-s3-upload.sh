BRANCH=$1
if [ "$BRANCH" = "master" ]
then
  aws s3 sync ./project s3://editorial-tools-help
fi
