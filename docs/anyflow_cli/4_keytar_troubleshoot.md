---
sidebar_position: 4
---

# Keytar Troubleshooting on Linux

If you encounter authentication issues on Linux systems, particularly in environments where the GNOME keyring isn't properly configured, follow this troubleshooting guide.

## System Dependencies

First, ensure all required system packages are installed:

For Ubuntu/Debian:
```bash
sudo apt-get install libsecret-1-dev gnome-keyring libsecret-tools
```

For Fedora/RHEL:
```bash
sudo dnf install libsecret-devel gnome-keyring
```

## Verify Configuration

1. Check if libsecret is properly installed:
```bash
pkg-config --libs libsecret-1
```
Expected output: `-lsecret-1 -lgio-2.0 -lgobject-2.0 -lglib-2.0`

2. Verify D-Bus session:
```bash
echo $DBUS_SESSION_BUS_ADDRESS
```
If empty, start a new session:
```bash
eval $(dbus-launch --sh-syntax)
```

3. Start the GNOME keyring daemon:
```bash
eval $(gnome-keyring-daemon --start --components=secrets,ssh)
export SSH_AUTH_SOCK
```

## Common Issues and Solutions

### GNOME Keyring Not Running

If the GNOME keyring isn't running, you might see errors like "No keyring daemon". To fix:

1. Start the daemon with debug output:
```bash
killall gnome-keyring-daemon
gnome-keyring-daemon --start --components=secrets --foreground --debug
```

2. Set the keyring control environment variable:
```bash
export GNOME_KEYRING_CONTROL=$(ls -d /run/user/$UID/keyring*/ 2>/dev/null | head -n 1)
```

### D-Bus Connection Issues

If you're having D-Bus connection problems:

1. Check the secret service connection:
```bash
gdbus call --session --dest org.freedesktop.secrets \
  --object-path /org/freedesktop/secrets \
  --method org.freedesktop.DBus.Peer.Ping
```

2. Verify the secret service is available:
```bash
dbus-send --session --dest=org.freedesktop.DBus \
  --type=method_call --print-reply /org/freedesktop/DBus \
  org.freedesktop.DBus.ListNames
```

### Testing Secret Storage

You can test if secret storage is working using the command-line tools:

```bash
# Store a test secret
secret-tool store --label="Test Secret" service TestService account TestAccount

# Retrieve the secret
secret-tool lookup service TestService account TestAccount
```

If these commands work but AnyFlow still has issues, please ensure your system's environment variables are properly set and try restarting your terminal session. 