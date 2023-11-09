START=$(date +%s)

for i in {1..50}
do
  pnpm vitest --run
done

END=$(date +%s)
DIFF=$(( $END - $START ))
echo "Vitest tests took $DIFF seconds"
