import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';

export default function Profile() {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const {
    connect, connectors, error, isLoading, pendingConnector,
  } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <img src={ensAvatar!} alt="ENS Avatar" />
        <div>{ensName ? `${ensName} (${address})` : address}</div>

        <div>
          Connected to
          {connector?.name}
        </div>

        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((c) => (
        <button
          disabled={!c.ready}
          key={c.id}
          onClick={() => connect({ connector: c })}
        >
          {c.name}
          {!c.ready && ' (unsupported)'}
          {isLoading
            && c.id === pendingConnector?.id
            && ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}
