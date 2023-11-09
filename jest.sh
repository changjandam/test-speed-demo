START=$(date +%s)

for i in {1..10}
do
  pnpm run test-jest
done

END=$(date +%s)
DIFF=$(( $END - $START ))
echo "Jest tests took $DIFF seconds"
