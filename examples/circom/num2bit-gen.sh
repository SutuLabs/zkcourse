#!/bin/sh

FILENAME=../../docs/notes/num2bit.md
SRCNAME=num2bit

echo "# Num2Bit">$FILENAME

echo >>$FILENAME
echo '```c'>>$FILENAME
cat $SRCNAME-1.circom>>$FILENAME
echo >>$FILENAME
echo '```'>>$FILENAME

for i in 1 2 3 4 5; do
    echo >>$FILENAME
    echo '<div style="page-break-after: always;"></div>'>>$FILENAME
    echo >>$FILENAME
    echo '```diff'>>$FILENAME
    diff -u $SRCNAME-$i.circom $SRCNAME-$((i+1)).circom | tail -n +3>>$FILENAME
    echo '```'>>$FILENAME
done