# O programu
- Backend ma za ukol primo komunikovat s MySQL, ktera se nachazi na pozadi. Z MySQL vycita python script zaznamy, z kterych vytvari Zone files, ktere BIND server vyuziva. Zvaziji implementaci Redis serveru pro rychlost a vyuziti PowerDNS misto BIND.
- Program podporuje operace jako get, add, edit a delete. (Mozno videt v routes)
- Aktualne neni vyreseny RBAC v ramci GUI, ale to neni nic sloziteho, tim ze budou jen 2 role a to je admin a view-only user.
- Program byl otestovany na MySQL databazi s testovacimi zaznamy a funguje krasne, tudiz pro ucely meho programu ho hodnotim jako funkcni. (DNS FW je primarne zameren na infrastrukturu, kterou stavim)
- Zaverecny ukol bude mozne otestovat primo nastaveni DNS serveru a pristupem na nejakou testovaci stranku.

### MySQL
![image](https://github.com/user-attachments/assets/ea14c222-f2f2-426e-9248-97c845bd3956)
