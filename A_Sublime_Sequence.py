t = int(input())
for _ in range(t):
    n ,s = map(int,input().split())
    res = n
    if s%2==0:
        res =0
    print(res)